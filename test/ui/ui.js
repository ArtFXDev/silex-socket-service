/* eslint-disable no-unused-vars */
const Client = require("socket.io-client")
const assert = require("chai").assert
const { it, describe, before, after } = require("mocha")

/** test cases */
describe("silex_socket_service_ui", () => {
  let clientDcc, clientDccAction, clientUi
  const port = 5118

  before((done) => {
    clientDcc = new Client(`http://localhost:${port}/dcc`)
    clientDccAction = new Client(`http://localhost:${port}/dcc/action`)
    clientUi = new Client(`http://localhost:${port}/ui`)
    clientDcc.on("connect", () => {
      // done()    <-- todo : need to find why this not work
    })
    done()
  })

  after(() => {
    clientUi.close()
    clientDcc.close()
  })

  it("Test ui initialization", (done) => {
    clientUi.emit("initialization", { uuid: -1 }, (response) => {
      assert.equal(response.status, 200) // validate reception
      done()
    })
  })

  it("Test ui initialization error", (done) => {
    clientUi.emit("initialization", {}, (response) => {
      assert.equal(response.status, 500) // validate reception
      done()
    })
  })

  it("Test ui get clients", (done) => {
    clientUi.emit("getClients", (response) => {
      assert.equal(response.status, 200) // validate reception
      done()
    })
  })

  it("Test ui dccConnect", (done) => {
    clientUi.on("dccConnect", (_value) => {
      done()
    })
    clientDcc.emit(
      "initialization",
      {
        name: "untilted",
        dcc: "undefined",
        user: "undefined",
        project: "undefined",
        asset: "undefined",
        uuid: -1
      },
      (_response) => {}
    )
  })

  it("Test ui submit", (done) => {
    clientDcc.on("submit", (_data) => {
      done()
    })

    clientUi.on("actionQuery", (data) => {
      clientUi.emit("submit", data)
    })

    clientDccAction.emit("query", { uuid: -1 }, (_callbackData) => {})
  })

  it("Test ui update", (done) => {
    clientDccAction.on("update", (_data) => {
      done()
    })

    clientUi.emit("actionUpdate", { uuid: -1 }, (_callbackData) => {})
  })

  it("Test ui dccDisconnect", (done) => {
    clientUi.on("dccDisconnect", () => {
      done()
    })
    clientDcc.close()
  })
})
