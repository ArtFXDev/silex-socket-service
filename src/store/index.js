const STORE_KEY = Symbol.for("silex_socket_service.store")
const globalSymbols = Object.getOwnPropertySymbols(global)
const hasStore = globalSymbols.indexOf(STORE_KEY) > -1

const store = {
  dccs: {},
  uis: {},
  access_token: undefined,
  refresh_token: undefined,
  currentAction: undefined
}

if (!hasStore) {
  global[STORE_KEY] = { data: store }
}

const singleton = {}

Object.defineProperty(singleton, "instance", {
  get: function () {
    return global[STORE_KEY]
  }
})

Object.freeze(singleton)

module.exports = singleton
