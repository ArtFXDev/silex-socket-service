const Client = require("socket.io-client")
const assert = require("chai").assert

/** test cases */
// eslint-disable-next-line no-undef
describe("silex_socket_service_auth", () => {
  let clientAuth
  const port = 5118

  // eslint-disable-next-line no-undef
  before((done) => {
    clientAuth = new Client(`http://localhost:${port}/auth`)
    clientAuth.on("connect", () => {
      // done()    <-- todo : need to find why this not work
    })
    done()
  })

  // eslint-disable-next-line no-undef
  after(() => {
    clientAuth.close()
  })

  /*
  // eslint-disable-next-line no-undef
  it("Test ui login kitsu", (done) => {
    clientAuth.emit("login", { email: "admin@example.com", password: "mysecretpassword" }, (response) => {
      assert.equal(response.status, 200)
      done()
    })
  })

  // eslint-disable-next-line no-undef
  it("Test error login kitsu", (done) => {
    clientAuth.emit("login", { email: "admin@example.com", password: "mybadsecretpassword" }, (response) => {
      console.log(response)
      assert.equal(response.status, 500)
      done()
    })
  })*/

  // eslint-disable-next-line no-undef
  it("Test auth get token", (done) => {
    clientAuth.emit("token", (response) => {
      assert.equal(response.status, 200)
      done()
    })
  })
})
