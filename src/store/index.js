/**
 * The store is used as centralized place for data in the library.
 */
const store = {
  /** List of dcc clients */
  dccs: {},

  /** The dict of running actions associated with their ids */
  runningActions: {},

  /** Access token for authentication */
  access_token: undefined,

  /** Refresh token for refreshing the auth token */
  refresh_token: undefined
}

// ----------------------------------------------------
// Singleton boring stuff for NodeJS...

const STORE_KEY = Symbol.for("silex_socket_service.store")
const globalSymbols = Object.getOwnPropertySymbols(global)
const hasStore = globalSymbols.indexOf(STORE_KEY) > -1

if (!hasStore) {
  global[STORE_KEY] = { data: store }
}

const singleton = {}

Object.defineProperty(singleton, "instance", {
  get: function () {
    return global[STORE_KEY]
  }
})

module.exports = singleton
