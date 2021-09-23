const mainApp = require("../src/index")

// eslint-disable-next-line no-undef
describe("silex_socket_service_init_server", () => {
  // eslint-disable-next-line no-undef
  before((done) => {
    mainApp.run()
    done()
  })
})
