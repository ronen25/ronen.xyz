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
	"encoding/json"
	"time"
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

// MarshalRepoInfoArray Marshals a repo array into a
func MarshalRepoInfoArray(repos []RepoInfo) (string, error) {
	// Marshal the repo array to JSON.
	marshalTime := time.Time.UTC(time.Now())
	marshalData := struct {
		MarshalTime string     `json:"date"`
		Data        []RepoInfo `json:"repos"`
	}{
		marshalTime.Format(time.UnixDate),
		repos,
	}

	jsonData, jsonErr := json.MarshalIndent(marshalData, "", "\t")
	if jsonErr != nil {
		return "", jsonErr
	}

	// Return the prettified JSON
	return string(jsonData), nil
}
