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
| `cache_update_interval` | This service maintaines a cache for the information it retrieves. This setting controls the time, in minutes, that the cache will be valid for. | `120` |
| `tls` | `true` to run on port 443 using TLS; otherwise `false` | `true` |
| `tls_cert` | TLS Certificate file. Required only if running in TLS mode. | `/path/cert.crt` |
| `tls_key` | TLS key file. Required only if running in TLS mode. | `/path/key.key` |

## Building and Running the Image
### Via makefile
The provided makefile takes care of most of the build tasks.
To build the image do:
```
$ make build
```

To run the image, make sure to edit the commandline first (depending on what's needed) and then run:
```
$ make dockerimage
```

### Manually
To build the Docker image simply use:
```
$ docker build -t projectinfo-alpine
```

Then to run a container based on the newly-built image:
```
$ docker run -it --name [CONTAINER NAME] -p[HOST:CONTAINER] -ePROJECTINFO_CONFIG_FILE=[PATH TO CONFIG] -v[volume]:[volume] -w[volume] projectinfo-alpine
```