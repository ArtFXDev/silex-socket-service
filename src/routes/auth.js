const axios = require("axios")
const store = require("../store")
const express = require("express")
const authRouter = express.Router()

authRouter.post("/login", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.ZOU_API_URL}/api/auth/login`,
      req.body,
      {
        timeout: 1500
      }
    )

    // Store the token
    store.instance.data.access_token = response.data.access_token

    // Return the data
    res.json(response.data)
  } catch (err) {
    res.status(404)
    res.json(err)
  }
})

authRouter.get("/token", (req, res) => {
  const token = store.instance.data.access_token

  if (!token) {
    res.status(404)
    res.send("No token")
    return
  }

  res.json({
    access_token: token
  })
})

module.exports = authRouter
