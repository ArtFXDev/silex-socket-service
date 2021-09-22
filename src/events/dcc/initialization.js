const store = require('../../store')

const initialization = (socket) => {
  console.log(data)
  console.log(store.dccs)
  socket.on("initialization", function () {
    console.log("aaaaa")
  })
}
  
module.exports = initialization