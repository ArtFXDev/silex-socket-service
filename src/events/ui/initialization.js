const store = require("../../store")

const initialization = (socket) => {
  socket.on("initialization", (data, callback) => {
    if (typeof data === "string" || data instanceof String) {
      data = JSON.parse(data)
    }

    // get uuid from data
    const uuid = data.uuid
    if (uuid) {
      store.uis[uuid] = data
      socket.data.uuid = uuid
    }
    if (!callback) {
      return
    }
    if (uuid) {
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 200, // ok
        msg: "Ok"
      })
    } else {
      // eslint-disable-next-line node/no-callback-literal
      callback({
        status: 500, // error
        msg: "Missing uuid in data."
      })
    }
  })
}
module.exports = initialization
