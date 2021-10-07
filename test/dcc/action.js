const Client = require("socket.io-client")
const assert = require("chai").assert

/** test cases */
describe("silex_socket_service_dcc", () => {
  let clientSocket
  const port = 5118

  before((done) => {
    clientSocket = new Client(`http://localhost:${port}/dcc/action`)
    clientSocket.on("connect", () => {
      // done()    <-- todo : need to find why this not work
    })
    done()
  })

  after(() => {
    clientSocket.close()
  })

  it("Test action query", (done) => {
    clientSocket.emit(
      "query",
      {
        myData: "undefined"
      },
      (response) => {
        assert.equal(response.status, 200) // validate reception
        done()
      }
    )
  })

  it("Test action request", (done) => {
    clientSocket.emit(
      "request",
      {
        myData: "undefined"
      },
      (response) => {
        assert.equal(response.status, 200) // validate reception
        done()
      }
    )
  })

  it("Test action update", (done) => {
    clientSocket.emit(
      "update",
      {
        myData: "undefined"
      },
      (response) => {
        assert.equal(response.status, 200) // validate reception
        done()
      }
    )
  })
})
