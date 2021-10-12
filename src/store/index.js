/* PROPS */
const STORE_KEY = Symbol.for("silex_socket_service.store")
const globalSymbols = Object.getOwnPropertySymbols(global)
const hasStore = globalSymbols.indexOf(STORE_KEY) > -1

const store = {
  name: "aaaa",
  storeFolder: "sss_data",
  storeFile: "userStore.json",
  dccs: {},
  uis: {},
  user: undefined,
  access_token: undefined,
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
