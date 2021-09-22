const store = require('../../../store')

const update = (sockt) => {
    console.log(store.dccs)
    socket.on("update", function () {
    console.log("aaaaa")
  })
}

module.exports = update