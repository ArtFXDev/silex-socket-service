const axios = require("axios").default
const store = require("../store")
const express = require("express")
const logger = require("../plugins/logger")
const {persistStore} = require("../store/persistence")
const authRouter = express.Router()

const {zouAPIURL} = require("../utils/zou")

authRouter.post("/login", async (req, res) => {
  logger.info("Received GET on /auth/login")

  const token = store.instance.data.access_token

  const login = async () => {
    try {
      const response = await axios.post(zouAPIURL("auth/login"), req.body, {
        timeout: 1500
      })

      // Store the token
      store.instance.data.access_token = response.data.access_token
      store.instance.data.refresh_token = response.data.refresh_token

      // Save the store
      persistStore()

      // Return the data
      res.json(response.data)

      logger.info("Logging successful!")
    } catch (err) {
      logger.error(`/auth/login error: ${err}`)
      res.status(404)
      res.json(err)
    }
  }

  // If there is a token, try to check if authenticated with that token
  if (token) {
    try {
      await axios.get(zouAPIURL("auth/authenticated"), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      logger.info("Token from the store is valid, we are authenticated")

      res.json("Token from store is valid")
    } catch (err) {
      logger.error("Token is invalid, logging directly...")
      logger.error(err)

      // Clear that token
      store.instance.data.access_token = undefined

      // Write it to the store
      persistStore()

      // If not, login with email password
      await login()
    }
  } else {
    logger.warn("There is no token saved in the store, logging...")
    await login()
  }
})

authRouter.post("/logout", async () => {
  logger.info("Received POST on /auth/logout")
  store.instance.data.access_token = undefined
  logger.info("Clearing access_token from the store...")
  persistStore()
})

authRouter.post("/refresh-token", async (req, res) => {
  logger.info("Received POST on /auth/refresh-token")
  const response = await axios.get(zouAPIURL("auth/refresh-token"), {
    headers: {
      Authorization: `Bearer ${store.instance.data.refresh_token}`
    }
  })

  logger.info("Setting a new access_token...")
  store.instance.data.access_token = response.data.access_token
  persistStore()
  res.json({
    access_token: store.instance.data.access_token
  })
})

authRouter.get("/token", async (req, res) => {
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
