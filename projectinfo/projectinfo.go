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
	"fmt"
	"log"
	"net/http"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

// Version ProjectInfo service version
const Version string = "1.0.1"

// "Global" variables
var (
	ctx    context.Context
	client github.Client
	conf   Config
)

// HandleProjectsInfo HTTP handler for the "projectinfo/" endpoint
func HandleProjectsInfo(w http.ResponseWriter, r *http.Request) {
	// Set JSON and CORS
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Retrieve the actual data
	data, err := FetchProjectInfo(&client, &ctx, conf.RepositoriesToFetch)
	if err != nil {
		log.Printf("HandleProjectsInfo: Error: " + err.Error())
	}

	// Write back the data to finish
	fmt.Fprintln(w, data)
}

// HandleVersion HTTP handler for the "version/" endpoint
func HandleVersion(w http.ResponseWriter, r *http.Request) {
	// Set JSON and CORS
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Write the version number, compiler and arch
	versionStruct := map[string]string{
		"Version": Version,
	}

	// Marshal (pretty) to JSON
	jsonData, err := json.MarshalIndent(versionStruct, "", "\t")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	// Write to response
	fmt.Fprintln(w, string(jsonData))
}

// InitializeGithubClient Initializes all github-related variables
func InitializeGithubClient(c *Config) {
	// Initialize background context, with the OAuth2 authentication.
	ctx = context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: conf.AccessToken},
	)

	tc := oauth2.NewClient(ctx, ts)

	// Initialize client
	client = *github.NewClient(tc)
}

func main() {
	// Load configuration
	var err error
	conf, err = LoadConfig()
	if err != nil {
		log.Fatalln("projectinfo: Error: " + err.Error())
	}

	// Initialize github stuff
	InitializeGithubClient(&conf)

	http.HandleFunc("/projectinfo", HandleProjectsInfo)
	http.HandleFunc("/version", HandleVersion)

	// Listen on TLS if it's configured
	if conf.TLS {
		fmt.Printf("DEBUG: projectinfo Listening (TLS) on :443")
		log.Fatal(http.ListenAndServe(":80", nil))
	} else {
		fmt.Printf("Warning: Started in non-TLS mode.")
		fmt.Printf("DEBUG: projectinfo Listening on :80")
		log.Fatal(http.ListenAndServe(":443", nil))
	}
}
