/*
 * projectinfo - ronen.xyz microservice for fetching github project information.
 * Copyright (C) Ronen Lapushner 2019.
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

package main

import (
	"context"
	"encoding/json"
	"log"
	"sort"
	"sync"
	"time"

	"github.com/google/go-github/github"
)

// RepoInfo Unmarshalled JSON structure to hold repository information.
type RepoInfo struct {
	ID             int64    `json:"id"`
	Name           string   `json:"name"`
	Description    string   `json:"description"`
	Topics         []string `json:"topics"`
	ScreenshotURLs []string `json:"screenshots"`
	Stars          int      `json:"stars"`
	Forks          int      `json:"forks"`
	License        string   `json:"license"`
	URL            string   `json:"url"`
}

// FetchRepoReturn The return type for the FetchRepoInfo function.
type FetchRepoReturn struct {
	Info  RepoInfo
	Error error
}

// "Global" variables
var (
	cache Cache
)

// FetchRepoInfo Fetch all information about a certain repository.
func FetchRepoInfo(c *github.Client, ctx *context.Context, repoName string,
	resultChannel chan<- FetchRepoReturn, wg *sync.WaitGroup) {
	var repoInfo RepoInfo

	defer wg.Done()

	// Fetch repository information
	repoDetails, _, err := client.Repositories.Get(*ctx, conf.UserName, repoName)
	if err != nil {
		log.Printf("Warning: Repo %s could not be found!", repoName)
		return
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
	_, dirContents, _, fetchErr := client.Repositories.GetContents(*ctx, conf.UserName,
		*repoDetails.Name, "screenshots", nil)
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
	resultChannel <- FetchRepoReturn{repoInfo, nil}
}

// FetchProjectInfo Fetch information about all the repos requested.
func FetchProjectInfo(c *github.Client, ctx *context.Context, repos []string) (string, error) {
	// Acquire a read lock for the cache
	cache.Lock()

	// First check if we need to get all changes again,
	// or a cached response will do.
	if time.Since(cache.LastChanged).Minutes() < float64(conf.CacheUpdateInterval) {
		log.Printf("Debug: %f since last update, giving cached response.", time.Since(cache.LastChanged).Minutes())
		// Return a cached response
		defer cache.Unlock()
		return cache.Data, nil
	}

	// OK to unlock now
	cache.Unlock()

	// Debug log
	log.Printf("Debug: Started cache update process")

	// Need to retrieve the data, so first retrieve the repositories we need.
	var repoArray []RepoInfo
	var wg sync.WaitGroup
	resultChannel := make(chan FetchRepoReturn)
	for _, repoName := range repos {
		wg.Add(1)

		// Fetch repo info with a goroutine
		go FetchRepoInfo(c, ctx, repoName, resultChannel, &wg)
	}

	// Wait for the goroutines to finish their job.
	go func() {
		wg.Wait()
		close(resultChannel)
	}()

	// While we're processing each repo, get the finished results (when ready)
	// and, if there's no error, push them to the repo information array.}()
	for repoInfo := range resultChannel {
		repoArray = append(repoArray, repoInfo.Info)
	}

	// Sort the array alphabetically
	sort.Slice(repoArray, func(i, j int) bool {
		return repoArray[i].Name < repoArray[j].Name
	})

	// Marshal the repo array to JSON.
	marshalTime := time.Time.UTC(time.Now())
	marshalData := struct {
		MarshalTime string     `json:"date"`
		Data        []RepoInfo `json:"repos"`
	}{
		marshalTime.Format(time.UnixDate),
		repoArray,
	}

	jsonData, jsonErr := json.MarshalIndent(marshalData, "", "\t")
	if jsonErr != nil {
		return "", jsonErr
	}

	// Store the prettified JSON in the cache, updating the date as well.
	jsonString := string(jsonData)
	cache.Lock()

	cache.Data = jsonString
	cache.LastChanged = marshalTime

	defer cache.Unlock()

	log.Printf("Debug: Cache update done.")

	// Finally return.
	return jsonString, nil
}
