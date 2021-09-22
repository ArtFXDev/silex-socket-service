const Client = require("socket.io-client")
const assert = require("chai").assert

/** test cases */
// eslint-disable-next-line no-undef
describe("silex_socket_service_ui", () => {
  let clientSocket
  const port = 3000

  // eslint-disable-next-line no-undef
  before((done) => {
    clientSocket = new Client(`http://localhost:${port}/dcc`)
    clientSocket.on("connect", () => {
      console.log("connected")
      clientSocket.emit("initialization", {
        name: "untilted",
        dcc: "undefined",
        user: "undefined",
        project: "undefined",
        asset: "undefined",
        uid: -2
      },
      (response) => {
        assert.equal(response.status, 200)
        clientSocket = new Client(`http://localhost:${port}/ui`)
        clientSocket.on("connect", () => {}) // validate reception
        done()
      })
      // done()    <-- todo : need to find why this not work
    })
  })

  // eslint-disable-next-line no-undef
  after(() => {
    clientSocket.close()
  })

  // eslint-disable-next-line no-undef
  it("Test dcc get clients", (done) => {
    clientSocket.emit("getclients", (response) => {
      assert.equal(response.status, 200) // validate reception
      console.log(response.data)
      done()
    })
  })
})
