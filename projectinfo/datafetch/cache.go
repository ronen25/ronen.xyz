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
	"fmt"
	"sync"
	"time"
)

var (
	// Cache The singleton instance of the program cache
	Cache RepoInfoCache
)

// RepoInfoCache Structure containing a cached response.
type RepoInfoCache struct {
	lastChanged time.Time
	repos       []RepoInfo
	mu          sync.RWMutex
}

// GetTop Gets top N repos.
func (c *RepoInfoCache) GetTop(count int) ([]RepoInfo, error) {
	c.mu.RLock()

	// Check range
	if count < 0 || count >= len(c.repos) {
		return nil, fmt.Errorf("Count is out of range: there are total of %d repos", len(c.repos))
	}

	// Return a slice
	slice := c.repos[:count]

	c.mu.RUnlock()

	return slice, nil
}

// GetAllData Returns the data currently cached
func (c *RepoInfoCache) GetAllData() []RepoInfo {
	c.mu.RLock()
	repos := c.repos
	c.mu.RUnlock()

	return repos
}

// SetData Sets a new data in the cache
func (c *RepoInfoCache) SetData(newData []RepoInfo) {
	c.mu.Lock()

	// Update date and data
	c.lastChanged = time.Time.UTC(time.Now())
	c.repos = newData

	c.mu.Unlock()
}

// GetLastChangeTime Gets the time.Time when the cache was last updated
func (c *RepoInfoCache) GetLastChangeTime() time.Time {
	c.mu.RLock()
	t := c.lastChanged
	c.mu.RUnlock()

	return t
}
