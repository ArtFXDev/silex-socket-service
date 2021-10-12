const axios = require("axios")
const store = require("../store")
const express = require("express")
const authRouter = express.Router()

authRouter.post("/login", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.ZOU_API_URL}/api/auth/login`,
      req.body,
      { timeout: 1500 }
    )

    store.instance.data.user = response.data.user
    store.instance.data.access_token = response.data.access_token
    res.json(response.data)
  } catch (err) {
    res.status(404)
    res.send(err)
  }
})

authRouter.get("/authenticated", (req, res) => {
  const user = store.instance.data.user

  if (!user) {
    res.status(404)
    res.send("")
  }

  res.json({
    user
  })
})

authRouter.get("/token", (req, res) => {
  const token = store.instance.data.access_token

  if (!token) {
    res.status(404)
    res.send("No token")
  }

  res.json({
    access_token: token
  })
})

module.exports = authRouter
