const axios = require("axios")
const store = require("../store")

/**
 * Returns the zou api url with that path
 */
function zouAPIURL(path) {
  return `${process.env.ZOU_API_URL}/api/${path}`
}

/**
 * Make a post request to that url with the access_token
 */
function post(url, data) {
  return axios.post(url, data, {
    headers: { Authorization: `Bearer ${store.instance.data.access_token}` }
  })
}

/**
 * Make a request to build the working file path
 */
function buildWorkingFilePath(taskId) {
  const url = zouAPIURL(`data/tasks/${taskId}/working-file-path`)

  const data = {
    mode: "working",
    name: "name",
    revision: 0
  }

  return post(url, data)
}

module.exports = {
  zouAPIURL,
  buildWorkingFilePath
}
