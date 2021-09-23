const Client = require("socket.io-client")
const assert = require("chai").assert

/** test cases */
// eslint-disable-next-line no-undef
describe("silex_socket_service_dcc", () => {
  let clientSocket
  const port = 3000

  // eslint-disable-next-line no-undef
  before((done) => {
    clientSocket = new Client(`http://localhost:${port}/dcc/action`)
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
  it("Test action query", (done) => {
    clientSocket.emit("query", {
      myData: "undefined"
    }, (response) => {
      assert.equal(response.status, 200) // validate reception
      console.log(response.msg)
      done()
    })
  })

  // eslint-disable-next-line no-undef
  it("Test action request", (done) => {
    clientSocket.emit("request", {
      myData: "undefined"
    }, (response) => {
      assert.equal(response.status, 200) // validate reception
      console.log(response.msg)
      done()
    })
  })

  // eslint-disable-next-line no-undef
  it("Test action update", (done) => {
    clientSocket.emit("update", {
      myData: "undefined"
    }, (response) => {
      assert.equal(response.status, 200) // validate reception
      console.log(response.msg)
      done()
    })
  })
})
