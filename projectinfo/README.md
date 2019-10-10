# projectinfo
A service that fetches the specified Github projects and returns some interesting information about them.

## Configuration
To configure the service, you must provide a configuration file. The configuration file's path must be configured via the `PROJECTINFO_CONFIG_FILE` environment variable.

An example configuration file is available at the `skel/` directory.

**Note:** All configuration variables are required unless stated otherwise.

| Configuration value | Description | Example |
| ------------------- | ----------- | ------- |
| `username` | Github username that contains the requested repositories. | `"ronen25"` |
| `access_token` | Github access token. For the best security, use a token that only has read access to your repositories! | |
| `repos` | A list of the repositories that will be fetched. | `[ "panorama", "libcmdf" ]` |
| `server_port` | The TCP port to use for listening for connections. | `7001` |
| `cache_update_interval` | This service maintaines a cache for the information it retrieves. This setting controls the time, in minutes, that the cache will be valid for. | `120` |

## Building and Running the Image
To build the Docker image simply use:
```
$ docker build -t projectinfo-alpine
```

Then to run a container based on the newly-built image:
```
$ docker run -it --name [CONTAINER NAME] -p[HOST:CONTAINER] -ePROJECTINFO_CONFIG_FILE=[PATH TO CONFIG] -v[volume]:[volume] -w[volume] projectinfo-alpine
```