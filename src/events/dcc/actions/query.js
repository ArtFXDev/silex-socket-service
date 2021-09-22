const store = require("../../../store")

const query = (socket) => {
  socket.on("query", function () {
    console.log("aaaaa")
  })
}
  
module.exports = query