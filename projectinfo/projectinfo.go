package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

// Constants
const VERSION string = "1.0.0"

// "Global" variables
var (
	ctx    context.Context
	client github.Client
	conf   Config
)

func HandleProjectsInfo(w http.ResponseWriter, r *http.Request) {
	// Set JSON
	w.Header().Set("Content-Type", "application/json")

	// Retrieve the actual data
	data, err := FetchProjectInfo(&client, &ctx, conf.RepositoriesToFetch)
	if err != nil {
		log.Printf("HandleProjectsInfo: Error: " + err.Error())
	}

	// Write back the data to finish
	fmt.Fprintln(w, data)
}

func HandleVersion(w http.ResponseWriter, r *http.Request) {
	// Set JSON
	w.Header().Set("Content-Type", "application/json")

	// Write the version number, compiler and arch
	versionStruct := map[string]string{
		"Version": VERSION,
	}

	// Marshal (pretty) to JSON
	jsonData, err := json.MarshalIndent(versionStruct, "", "\t")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	// Write to response
	fmt.Fprintln(w, string(jsonData))
}

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

	// Initialize the HTTP server and register handlers
	server := &http.Server{
		Addr: ":" + strconv.Itoa(conf.ServerPort),
	}

	http.HandleFunc("/projectinfo", HandleProjectsInfo)
	http.HandleFunc("/version", HandleVersion)

	fmt.Printf("Listening on port %d\n", conf.ServerPort)
	log.Fatal(server.ListenAndServe())
}
