package main

import (
	"context"
	"encoding/json"
	"log"
	"sync"
	"time"

	"github.com/google/go-github/github"
)

// Structure definitions

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

type Cache struct {
	lastChanged time.Time
	data        string
	accessLock  sync.Mutex
}

type FetchRepoReturn struct {
	Info  RepoInfo
	Error error
}

// "Global" variables
var (
	cache Cache
)

func FetchRepoInfo(c *github.Client, ctx *context.Context, repoName string,
	resultChannel chan<- FetchRepoReturn, wg *sync.WaitGroup) {
	var repoInfo RepoInfo

	defer wg.Done()

	// Fetch repository information
	repoDetails, _, err := client.Repositories.Get(*ctx, "ronen25", repoName)
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
	_, dirContents, _, fetchErr := client.Repositories.GetContents(*ctx, "ronen25",
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

func FetchProjectInfo(c *github.Client, ctx *context.Context, repos []string) (string, error) {
	// Acquire a read lock for the cache
	cache.accessLock.Lock()

	// First check if we need to get all changes again,
	// or a cached response will do.
	if time.Since(cache.lastChanged).Minutes() < float64(conf.CacheUpdateInterval) {
		log.Printf("Debug: %f since last update, giving cached response.", time.Since(cache.lastChanged).Minutes())
		// Return a cached response
		cache.accessLock.Unlock()
		return cache.data, nil
	}

	// OK to unlock now
	cache.accessLock.Unlock()

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
	cache.accessLock.Lock()

	cache.data = jsonString
	cache.lastChanged = marshalTime

	cache.accessLock.Unlock()

	log.Printf("Debug: Cache update done.")

	// Finally return.
	return jsonString, nil
}
