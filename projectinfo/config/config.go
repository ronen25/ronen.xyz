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

package config

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"os"
)

// ConfigFileEnvVar Path for the configuration file that will be used by the service.
const ConfigFileEnvVar string = "PROJECTINFO_CONFIG_FILE"

// Config Unmarshalled structure that holds the config values.
type Config struct {
	UserName            string `json:"username"`
	AccessToken         string `json:"access_token"`
	CacheUpdateInterval int    `json:"cache_update_interval"`
	TLS                 bool   `json:"tls"`
	TLSCert             string `json:"tls_cert"`
	TLSKey              string `json:"tls_key"`
}

// Global configuration
var (
	GlobalConfig Config
)

// LoadConfig Load the configuration file, unmarshalling it, and storing it as the global config
// instance.
func LoadConfig() (err error) {
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
	unmarshalErr := json.Unmarshal(byteData, &GlobalConfig)
	if unmarshalErr != nil {
		err = unmarshalErr
		return
	}

	if len(GlobalConfig.AccessToken) == 0 {
		err = errors.New("Invalid or empty access token")
		return
	}

	// Verify some TLS stuff
	if GlobalConfig.TLS {
		if len(GlobalConfig.TLSCert) == 0 || len(GlobalConfig.TLSKey) == 0 {
			err = errors.New("Either the tls_cert or tls_key are empty, but tls = 1")
			return
		}
	}

	fmt.Println(GlobalConfig)

	return nil
}
