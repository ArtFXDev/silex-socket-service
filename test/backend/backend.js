const Client = require("socket.io-client")

const assert = require("chai").assert

/** test cases */
// eslint-disable-next-line no-undef
describe("silex_socket_service", () => {
  let clientSocket
  const port = 3000

  // eslint-disable-next-line no-undef
  before((done) => {
    clientSocket = new Client(`http://localhost:${port}`)
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
  it("Test connection backend", (done) => {
    clientSocket.on("onbackend", (data) => {
      console.log(data)
      assert.equal(data, "myData")
      done()
    })
    clientSocket.emit("ebackend")
  })
})
