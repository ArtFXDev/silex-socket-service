const axios = require("axios")
const store = require("../store")
const express = require("express")
const logger = require("../plugins/logger")
const authRouter = express.Router()

const { zouAPIURL } = require("../utils/zou")

authRouter.post("/login", async (req, res) => {
  logger.info("Received GET on /auth/login")

  try {
    const response = await axios.post(zouAPIURL("auth/login"), req.body, {
      timeout: 1500
    })

    // Store the token
    store.instance.data.access_token = response.data.access_token

    // Return the data
    res.json(response.data)
  } catch (err) {
    logger.error(`/auth/login error: ${err}`)
    res.status(404)
    res.json(err)
  }
})

authRouter.get("/token", (req, res) => {
  logger.info("Received GET on /auth/token")

  const token = store.instance.data.access_token

  if (!token) {
    logger.error("/auth/token error: There's no token saved in the store")
    res.status(404)
    res.send("No token")
    return
  }

  res.json({
    access_token: token
  })
})

module.exports = authRouter
