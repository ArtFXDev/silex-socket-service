const Client = require("socket.io-client")
const assert = require("chai").assert

/** test cases */
describe("silex_socket_service_dcc", () => {
  let clientSocket
  const port = 5118

  before((done) => {
    clientSocket = new Client(`http://localhost:${port}/dcc`)
    clientSocket.on("connect", () => {
      // done()    <-- todo : need to find why this not work
    })
    done()
  })

  after(() => {
    clientSocket.close()
  })

  it("Test dcc initialization ok", (done) => {
    clientSocket.emit("initialization", {
      name: "untilted",
      dcc: "undefined",
      user: "undefined",
      project: "undefined",
      asset: "undefined",
      uuid: -1
    },
    (response) => {
      assert.equal(response.status, 200) // validate reception
      done()
    })
  })

  it("Test dcc initialization error", (done) => {
    clientSocket.emit("initialization", {
      name: "untilted",
      dcc: "undefined",
      user: "undefined",
      project: "undefined",
      asset: "undefined"
    }, (response) => {
      assert.equal(response.status, 500) // validate reception
      done()
    })
  })
})
