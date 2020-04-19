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

package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/ronen25/ronen.xyz/projectinfo/config"
	"github.com/ronen25/ronen.xyz/projectinfo/datafetch"
)

func main() {
	// Load configuration
	err := config.LoadConfig()
	if err != nil {
		log.Fatalln(os.Args[0] + ": Error: " + err.Error())
	}

	// Initialize github stuff
	datafetch.InitializeGithubClient(config.GlobalConfig.AccessToken)

	// Initialzie the Gorilla mux
	router := mux.NewRouter()

	router.HandleFunc("/top", datafetch.HandleTopProjects).Methods(http.MethodGet, http.MethodOptions)
	router.HandleFunc("/all", datafetch.HandleAllProjects).Methods(http.MethodGet, http.MethodOptions)
	router.HandleFunc("/version", datafetch.HandleVersion).Methods(http.MethodGet, http.MethodOptions)

	// Use CORS
	router.Use(mux.CORSMethodMiddleware(router))

	// Listen on TLS if it's configured
	if config.GlobalConfig.TLS {
		log.Println("Listening (TLS) on :443")
		log.Fatal(http.ListenAndServeTLS(":443", config.GlobalConfig.TLSCert,
			config.GlobalConfig.TLSKey, router))
	} else {
		log.Println("Warning: Started in non-TLS mode.")
		log.Println("Listening on :80")
		log.Fatal(http.ListenAndServe(":80", router))
	}
}
