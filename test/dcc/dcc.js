const Client = require("socket.io-client")
// const assert = require("chai")

/** test cases */
// eslint-disable-next-line no-undef
describe("silex_socket_service", () => {
  let clientSocket
  const port = 3000

  // eslint-disable-next-line no-undef
  before((done) => {
    clientSocket = new Client(`http://localhost:${port}/dcc`)
    clientSocket.on("connect", () => {
      console.log("connected")
      // done()    <-- todo : need to find why this not work
    })
    done()
  })

  // eslint-disable-next-line no-undef
  after(() => {
    clientSocket.close()
  })

  // eslint-disable-next-line no-undef
  it("Test dcc connection", (done) => {
    clientSocket.on("ondcc", (arg) => {
      console.log(arg)
      done()
    })
    clientSocket.emit("edcc")
  })
})
