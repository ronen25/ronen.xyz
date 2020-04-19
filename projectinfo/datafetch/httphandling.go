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
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

// "Global" variables
var (
	GithubContext context.Context
	GithubClient  *github.Client
)

// Version ProjectInfo service version
var Version = "0.0.0"

// InitializeGithubClient Initializes all github-related variables
func InitializeGithubClient(accessToken string) {
	// Initialize background context, with the OAuth2 authentication.
	GithubContext = context.Background()
	ts := oauth2.StaticTokenSource(
		&oauth2.Token{AccessToken: accessToken},
	)

	tc := oauth2.NewClient(GithubContext, ts)

	// Initialize client
	GithubClient = github.NewClient(tc)
}

// HandleAllProjects HTTP handler for the "projectinfo/" endpoint
func HandleAllProjects(w http.ResponseWriter, r *http.Request) {
	// Set CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Retrieve the actual data
	data, err := FetchAllReposInfo()
	if err != nil {
		http.Error(w, "Error: "+err.Error(), http.StatusBadRequest)
		return
	}

	// Write back the data to finish
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintln(w, data)
}

// HandleTopProjects HTTP handler for the "projectinfo/" endpoint
func HandleTopProjects(w http.ResponseWriter, r *http.Request) {
	// Set CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Require a parameter
	countMaybe, ok := r.URL.Query()["count"]
	if !ok {
		http.Error(w, "Missing parameter 'count' for endpoint /top", http.StatusBadRequest)
		return
	}

	count, err := strconv.Atoi(countMaybe[0])
	if err != nil {
		http.Error(w, "Parameter 'count' malformed or out of range", http.StatusBadRequest)
		return
	}

	// Retrieve the actual data
	data, err := FetchTopReposInfo(count)
	if err != nil {
		http.Error(w, "HandleTopProjects: Error: "+err.Error(), http.StatusBadRequest)
		return
	}

	// Write back the data to finish
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintln(w, data)
}

// HandleVersion HTTP handler for the "version/" endpoint
func HandleVersion(w http.ResponseWriter, r *http.Request) {
	// Set JSON and CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Write the version number, compiler and arch
	versionStruct := map[string]string{
		"version": Version,
	}

	// Marshal (pretty) to JSON
	jsonData, err := json.MarshalIndent(versionStruct, "", "\t")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	// Write to response
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintln(w, string(jsonData))
}
