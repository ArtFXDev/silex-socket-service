/** NAMEPSACE  */
const authNamespace = require("../namespaces/auth/auth")

/** EVENTS */
const auth = require("../events/auth/auth")

module.exports = function (io) {
  authNamespace(io).on("connection", function (socket) {
    auth(socket)
  })
}
