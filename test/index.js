const mainApp = require("../src/index")

// eslint-disable-next-line no-undef
describe("silex_socket_service INIT Server", () => {
  // eslint-disable-next-line no-undef
  before((done) => {
    mainApp.run()
    done()
  })
})
