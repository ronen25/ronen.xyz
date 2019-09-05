projectinfo
===============
This is a small microservice that queries the Github API and retrieves the projects I wanna showcase on my website.

The service responds to two endpoints:
| Endpoint | Description |
| -------- | ----------- |
| `/about` | Information about this service, including the version number, cache state, etc. |
| `/getinfo` | Get information about projects. |

## Fetching the Info
The service queries the Github API in a set interval, and stores the results in an internal cache. As long as the interval has not passed, `/getinfo` requests will be given the cached information.

The cache will be refreshed lazily once a `/getinfo` request is made and the cache is stale.

## Configuration
The service can be easily adaptable to your own needs - simply provide a `projectinfo.conf`!

A skeleton version (with comments and documentation) is available in the `skel` folder.