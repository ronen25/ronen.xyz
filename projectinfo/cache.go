package main

import (
	"sync"
	"time"
)

// Cache Structure containing a cached response.
type Cache struct {
	LastChanged time.Time
	Data        string
	mutex       sync.Mutex
}

// Lock Lock the cache for changes
func (c *Cache) Lock() {
	c.mutex.Lock()
}

// Unlock Unlock the cache
func (c *Cache) Unlock() {
	c.mutex.Unlock()
}
