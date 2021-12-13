const axios = require("axios").default;
const store = require("../store");
const express = require("express");
const logger = require("../utils/logger");
const { persistStore } = require("../store/persistence");
const authRouter = express.Router();

const { zouAPIURL } = require("../utils/zou");

/**
 * POST /auth/login
 *
 * Login route used by the UI to authenticate.
 * We need to store tokens inside the browser with cookies and also in the socket server
 * for the dcc to have access to authentication.
 */
authRouter.post("/login", async (req, res) => {
  logger.debugHTTPMessage("POST", "/auth/login");

  /**
   * Login to the backend API
   */
  const login = async () => {
    try {
      const response = await axios.post(zouAPIURL("auth/login"), req.body, {
        timeout: 1500,
      });

      // Store the token
      store.instance.data.access_token = response.data.access_token;
      store.instance.data.refresh_token = response.data.refresh_token;

      // Save the store
      persistStore();

      // Return the data
      res.json(response.data);

      logger.info("Logging successful!");
    } catch (err) {
      logger.error(`/auth/login error: ${err}`);
      res.status(404);
      res.json(err);
    }
  };

  // Get the access token in the store
  const storedAccessToken = store.instance.data.access_token;

  // If there is a token in the store, try to check if auth works with this token
  if (storedAccessToken) {
    try {
      await axios.get(zouAPIURL("auth/authenticated"), {
        headers: {
          Authorization: `Bearer ${storedAccessToken}`,
        },
      });

      logger.info("Token from the store is valid, we are authenticated");

      res.json("Token from store is valid");
    } catch (err) {
      logger.error("Token is invalid, logging directly...");
      logger.error(err);

      // Clear that token
      store.instance.data.access_token = undefined;

      // Write it to the store
      persistStore();

      // If not, login with email password
      await login();
    }
  } else {
    logger.warn("There is no token saved in the store, logging...");
    await login();
  }
});

/**
 * POST /auth/logout
 *
 * Logout route that clear the tokens from the store
 */
authRouter.post("/logout", async () => {
  logger.debugHTTPMessage("POST", "/auth/logout");

  // Clear both tokens
  logger.info("Clearing access_token and refresh_token from the store");
  store.instance.data.access_token = undefined;
  store.instance.data.refresh_token = undefined;

  // Write changes to the store file
  persistStore();
});

/**
 * GET /auth/refresh-token
 *
 * Logout route that clear the tokens from the store
 */
authRouter.get("/refresh-token", async (req, res) => {
  logger.debugHTTPMessage("GET", "/auth/refresh-token");

  // Refresh the access token from the API
  const response = await axios.get(zouAPIURL("auth/refresh-token"), {
    headers: {
      Authorization: `Bearer ${store.instance.data.refresh_token}`,
    },
  });

  logger.info("Setting a new access_token...");
  store.instance.data.access_token = response.data.access_token;

  // Write changes to store
  persistStore();

  // Return the new access_token
  res.json(response.data);
});

/**
 * GET /auth/token
 *
 * Return the access_token from the store
 */
authRouter.get("/token", async (req, res) => {
  logger.debugHTTPMessage("GET", "/auth/token");

  // Get that token
  const token = store.instance.data.access_token;

  if (!token) {
    const message = "There is no token saved in the store";
    logger.error(message);

    res.status(404);
    res.send(message);

    return;
  }

  // Send the token
  res.json({
    access_token: token,
  });
});

module.exports = authRouter;
