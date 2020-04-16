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
	"encoding/json"
	"errors"
	"io/ioutil"
	"os"
)

// ConfigFileEnvVar Path for the configuration file that will be used by the service.
const ConfigFileEnvVar string = "PROJECTINFO_CONFIG_FILE"

// Config Unmarshalled structure that holds the config values.
type Config struct {
	UserName            string   `json:"username"`
	AccessToken         string   `json:"access_token"`
	RepositoriesToFetch []string `json:"repos"`
	CacheUpdateInterval int      `json:"cache_update_interval"`
	TLS                 bool     `json:"tls"`
	TLSCert             string   `json:"tls_cert"`
	TLSKey              string   `json:"tls_key"`
}

// LoadConfig Load the configuration file, unmarshalling it, and returning the Config structure.
func LoadConfig() (conf Config, err error) {
	// The environment variable should be set.
	location, found := os.LookupEnv(ConfigFileEnvVar)
	if !found {
		err = errors.New("Environment variable PROJECTINFO_CONFIG_FILE not found")
		return
	}

	// Variable found, now attempt to load the config
	file, ferr := os.Open(location)
	if ferr != nil {
		err = ferr
		return
	}

	defer file.Close()

	// Read all contents and convert to JSON
	byteData, readErr := ioutil.ReadAll(file)
	if readErr != nil {
		err = readErr
		return
	}
	unmarshalErr := json.Unmarshal(byteData, &conf)
	if unmarshalErr != nil {
		err = unmarshalErr
		return
	}

	// Now verify some of the configuration variables.
	if len(conf.RepositoriesToFetch) == 0 {
		err = errors.New("No repos listed in configuration file")
		return
	}

	if len(conf.AccessToken) == 0 {
		err = errors.New("Invalid or empty access token")
		return
	}

	// Verify some TLS stuff
	if conf.TLS {
		if len(conf.TLSCert) == 0 || len(conf.TLSKey) == 0 {
			err = errors.New("Either the tls_cert or tls_key are empty, but tls = 1")
			return
		}
	}

	return conf, nil
}
