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
	"encoding/json"
	"errors"
	"io/ioutil"
	"os"
)

const CONFIG_FILE_ENV_VAR string = "PROJECTINFO_CONFIG_FILE"

type Config struct {
	AccessToken         string   `json:"access_token"`
	RepositoriesToFetch []string `json:"repos"`
	ServerPort          int      `json:"server_port"`
}

func LoadConfig() (conf Config, err error) {
	// The environment variable should be set.
	location, found := os.LookupEnv(CONFIG_FILE_ENV_VAR)
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

	// Now verify that the configuration file is not empty.
	if len(conf.RepositoriesToFetch) == 0 {
		err = errors.New("No repos listed in configuration file")
		return
	}

	if len(conf.AccessToken) == 0 {
		err = errors.New("Invalid or empty access token")
		return
	}

	return
}
