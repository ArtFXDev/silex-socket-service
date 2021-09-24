const Client = require("socket.io-client")
const assert = require("chai").assert

/** test cases */
// eslint-disable-next-line no-undef
describe("silex_socket_service_dcc", () => {
  let clientSocket, secondClient
  const port = 5118

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
  it("Test dcc initialization ok", (done) => {
    clientSocket.emit("initialization", {
      name: "untilted",
      dcc: "undefined",
      user: "undefined",
      project: "undefined",
      asset: "undefined",
      uid: -1
    },
    (response) => {
      assert.equal(response.status, 200) // validate reception
      done()
    })
  })

  // eslint-disable-next-line no-undef
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

  // eslint-disable-next-line no-undef
  it("Test dcc broadcast room", (done) => {
    clientSocket.on("test", (value) => {
      console.log("ok ")
      console.log(value)
      done()
    })
    secondClient = new Client(`http://localhost:${port}/dcc`)
    secondClient.on("connect", (value) => {
      console.log("second connected")
      secondClient.emit("initialization", {
        name: "untilted",
        dcc: "undefined",
        user: "undefined",
        project: "undefined",
        asset: "undefined",
        uid: -1
      },
      (response) => {})
    })
  })
})
