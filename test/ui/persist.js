const Client = require("socket.io-client")

/** test cases */
describe("silex_socket_service_ui_persist", () => {
  let clientUi
  const port = 5118

  before((done) => {
    clientUi = new Client(`http://localhost:${port}/ui`)
    clientUi.on("connect", () => {
      // done()    <-- todo : need to find why this not work
    })
    done()
  })

  after(() => {
    clientUi.close()
  })
})
