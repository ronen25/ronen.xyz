process.env.VUE_APP_VERSION = require('./package.json').version
//process.env.PROJECTINFO_ENDPOINT = "http://projectinfo-service/projectinfo"
process.env.VUE_APP_PROJECTINFO_ENDPOINT = "http://localhost:7001/projectinfo"

module.exports = {
  // config
}