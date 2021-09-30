const Client = require("socket.io-client")
const assert = require("chai").assert

/** test cases */
// eslint-disable-next-line no-undef
describe("silex_socket_service_ui", () => {
  let clientDcc, clientDccAction, clientUi
  const port = 5118

  // eslint-disable-next-line no-undef
  before((done) => {
    clientDcc = new Client(`http://localhost:${port}/dcc`)
    clientDccAction = new Client(`http://localhost:${port}/dcc/action`)
    clientUi = new Client(`http://localhost:${port}/ui`)
    clientDcc.on("connect", () => {
      // done()    <-- todo : need to find why this not work
    })
    done()
  })

  // eslint-disable-next-line no-undef
  after(() => {
    clientUi.close()
    clientDcc.close()
  })

  // eslint-disable-next-line no-undef
  it("Test ui initialization", (done) => {
    clientUi.emit("initialization", { uuid: -1 }, (response) => {
      assert.equal(response.status, 200) // validate reception
      done()
    })
  })

  // eslint-disable-next-line no-undef
  it("Test ui initialization error", (done) => {
    clientUi.emit("initialization", {}, (response) => {
      assert.equal(response.status, 500) // validate reception
      done()
    })
  })

  // eslint-disable-next-line no-undef
  it("Test ui get clients", (done) => {
    clientUi.emit("getClients", (response) => {
      assert.equal(response.status, 200) // validate reception
      console.log(response.data)
      done()
    })
  })

  // eslint-disable-next-line no-undef
  it("Test ui dccConnect", (done) => {
    clientUi.on("dccConnect", (value) => {
      console.log("ok")
      console.log(value)
      done()
    })
    clientDcc.emit("initialization", {
      name: "untilted",
      dcc: "undefined",
      user: "undefined",
      project: "undefined",
      asset: "undefined",
      uuid: -1
    },
    (response) => {})
  })

  // eslint-disable-next-line no-undef
  it("Test ui submit", (done) => {
    clientDcc.on("submit", (data) => {
      done()
    })

    clientUi.on("query", (data) => {
      clientUi.emit("submit", data)
    })

    clientDccAction.emit("query", { uuid: -1 }, (callbackData) => {
      console.log(callbackData)
      if (callbackData.status === 200) {
        clientDcc.on("submit", (data) => {
          console.log(data)
        })
      }
    })
  })

  /*
  // eslint-disable-next-line no-undef
  it("Test ui login kitsu", (done) => {
    clientUi.emit("loginKitsu", { email: "admin@example.com", password: "mysecretpassword" }, (response) => {
      assert.equal(response.status, 200)
      done()
    })
  })

  // eslint-disable-next-line no-undef
  it("Test error login kitsu", (done) => {
    clientUi.emit("loginKitsu", { email: "admin@example.com", password: "mybadsecretpassword" }, (response) => {
      console.log(response)
      assert.equal(response.status, 500)
      done()
    })
  })*/

  // eslint-disable-next-line no-undef
  it("Test ui get token", (done) => {
    clientUi.emit("getAuthKitsu", (response) => {
      assert.equal(response.status, 200)
      done()
    })
  })

  // eslint-disable-next-line no-undef
  it("Test ui dccDisconnect", (done) => {
    clientUi.on("dccDisconnect", (value) => {
      done()
    })
    clientDcc.close()
  })
})
