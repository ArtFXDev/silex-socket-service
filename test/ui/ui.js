const Client = require("socket.io-client")
const assert = require("chai").assert

/** test cases */
// eslint-disable-next-line no-undef
describe("silex_socket_service_ui", () => {
  let clientDcc, clientUi
  const port = 3000

  // eslint-disable-next-line no-undef
  before((done) => {
    clientDcc = new Client(`http://localhost:${port}/dcc`)
    clientUi = new Client(`http://localhost:${port}/ui`)
    clientDcc.on("connect", () => {
      console.log("connected")
      clientDcc.emit("initialization", {
        name: "untilted",
        dcc: "undefined",
        user: "undefined",
        project: "undefined",
        asset: "undefined",
        uid: -2
      },
      (response) => {
        assert.equal(response.status, 200)
        done()
      })
      // done()    <-- todo : need to find why this not work
    })
  })

  // eslint-disable-next-line no-undef
  after(() => {
    clientUi.close()
    clientDcc.close()
  })

  // eslint-disable-next-line no-undef
  it("Test dcc get clients", (done) => {
    clientUi.emit("getclients", (response) => {
      assert.equal(response.status, 200) // validate reception
      console.log(response.data)
      done()
    })
  })
})
