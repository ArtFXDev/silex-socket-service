const axios = require("axios")
const store = require("../store")

function zouAPIURL(path) {
  return `${process.env.ZOU_API_URL}/api/${path}`
}

function post(url, data) {
  return axios.post(url, data, {
    headers: { Authorization: `Bearer ${store.instance.data.access_token}` }
  })
}

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
