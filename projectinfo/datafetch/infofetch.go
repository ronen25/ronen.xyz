/*
 * projectinfo - ronen.xyz microservice for fetching github project information.
 * Copyright (C) Ronen Lapushner 2019 - 2020.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

package datafetch

import (
	"log"
	"sort"
	"sync"
	"time"

	"github.com/ronen25/ronen.xyz/projectinfo/config"
)

// organizeRepoInfo Fetch all information about a certain repository.
func organizeRepoInfo(repoName string) (RepoInfo, error) {
	var repoInfo RepoInfo

	// Fetch repository information
	repoDetails, _, err := GithubClient.Repositories.Get(GithubContext, config.GlobalConfig.UserName, repoName)
	if err != nil {
		log.Printf("Warning: Repo %s could not be found!", repoName)
		return RepoInfo{}, err
	}

	// Copy all the trivial information
	repoInfo.ID = *repoDetails.ID
	repoInfo.Name = *repoDetails.Name
	repoInfo.Description = *repoDetails.Description
	repoInfo.Stars = *repoDetails.StargazersCount
	repoInfo.Forks = *repoDetails.ForksCount
	repoInfo.URL = *repoDetails.HTMLURL
	repoInfo.Topics = repoDetails.Topics

	if repoDetails.License != nil {
		repoInfo.License = *repoDetails.License.SPDXID
	} else {
		repoInfo.License = ""
	}

	// For the screenshots, we need to locate a "screenshots" folder
	// in the repo, and get the URLs of all the files there.
	_, dirContents, _, fetchErr := GithubClient.Repositories.GetContents(GithubContext, config.GlobalConfig.UserName,
		*repoDetails.Name,
		"screenshots", nil)
	if fetchErr != nil {
		log.Printf("Warning: Repo %s: %s ", repoInfo.Name, fetchErr.Error())
	}

	// Go through the array, get the URLs of the content inside
	for _, screenshotFile := range dirContents {
		if *screenshotFile.Type == "file" {
			repoInfo.ScreenshotURLs = append(repoInfo.ScreenshotURLs, *screenshotFile.DownloadURL)
		}
	}

	// We're done, return the information.
	return repoInfo, nil
}

// sortRepoinfo Returns the repository array, sorted.
func sortRepoArray(repos *[]RepoInfo) {
	// Sort the array by stars, so that fetching the top N will be easy.
	sort.Slice(*repos, func(i, j int) bool {
		return (*repos)[i].Stars > (*repos)[j].Stars
	})
}

// RefreshRepoInfo Get repository information from Github.
// Use only if cache is stale, since this operation might take a while.
func refreshRepoInfo() error {
	// Need to retrieve the data, so first retrieve the repositories we need.
	var repoArray []RepoInfo
	var wg sync.WaitGroup
	resultChannel := make(chan RepoInfo)

	// Debug log
	log.Printf("Started cache update process")

	repos, _, err := GithubClient.Repositories.List(GithubContext, "ronen25", nil)
	if err != nil {
		return err
	}

	for _, repo := range repos {
		wg.Add(1)

		// Async. organize the repository information.
		go func(repoName string) {
			defer wg.Done()

			// Fetch repository information
			result, err := organizeRepoInfo(repoName)
			if err != nil {
				log.Printf("Error: %s", err.Error())
				return
			}

			// Put in result channel
			resultChannel <- result
		}(*repo.Name)
	}

	// Wait for the goroutines to finish their job.
	go func() {
		wg.Wait()
		close(resultChannel)
	}()

	// While we're processing each repo, get the finished results (when ready)
	// and, if there's no error, push them to the repo information array.}()
	for repoInfo := range resultChannel {
		repoArray = append(repoArray, repoInfo)
	}

	// Sort the array
	sortRepoArray(&repoArray)

	// Store the data in the cache. This will update the access time.
	Cache.SetData(repoArray)
	log.Printf("Debug: Cache update done.")

	// Done successfully.
	return nil
}

// FetchAllReposInfo Fetch information about all the repos.
func FetchAllReposInfo() (returnData string, err error) {
	// First check if we need to get all changes again,
	// or a cached response will do.
	cacheChange := Cache.GetLastChangeTime()
	if time.Since(cacheChange).Minutes() >= float64(config.GlobalConfig.CacheUpdateInterval) {
		log.Println("Cache stale; initiating cache refresh.")

		err = refreshRepoInfo()
		if err != nil {
			return "", err
		}
	}

	// Marshal the data from the cache and return it.
	// This should be up-to-date.
	returnData, err = MarshalRepoInfoArray(Cache.GetAllData())
	return returnData, err
}

// FetchTopReposInfo Fetch the top [count] repositories.
// Repositories are sorted by stars.
func FetchTopReposInfo(count int) (returnData string, err error) {
	// First check if we need to get all changes again,
	// or a cached response will do.
	cacheChange := Cache.GetLastChangeTime()
	if time.Since(cacheChange).Minutes() >= float64(config.GlobalConfig.CacheUpdateInterval) {
		log.Println("Cache stale; initiating cache refresh.")

		err = refreshRepoInfo()
		if err != nil {
			return "", err
		}
	}

	// Marshal the data from the cache and return it.
	// This should be up-to-date.
	data, err := Cache.GetTop(count)
	if err != nil {
		return "", err
	}

	returnData, err = MarshalRepoInfoArray(data)
	return returnData, err
}
