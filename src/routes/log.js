const express = require("express")
const fs = require("fs")
const path = require("path")
const logRouter = express.Router()

logRouter.get("/:file", (req, res) => {
  try {
    let data = fs
      .readFileSync(
        path.join(process.env.SILEX_LOG_DIR, req.params.file),
        "utf8"
      )
      .toString()
      .split("\n")

    const { fromEnd } = req.query
    if (fromEnd && fromEnd < data.length) {
      data = data.slice(data.length - fromEnd, data.length)
    }

    res.json(data)
  } catch (err) {
    res.status(404).json(err)
  }
})

module.exports = logRouter
