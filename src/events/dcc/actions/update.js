const store = require("../../../store")

const update = (socket, io) => {
  console.log(store.dccs)
  socket.on("update", function () {
    console.log("aaaaa")
  })
}

module.exports = update
