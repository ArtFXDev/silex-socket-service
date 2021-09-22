/** NAMEPSACE  */
const uiNamespace = require("../namespaces/ui/ui")

/** EVENTS */
const getclients = require("../events/ui/getclients")

/** ROOMS */
// ...

module.exports = function (io) {
  uiNamespace(io).on("connection", function (socket) {
    getclients(socket)
  })
}
