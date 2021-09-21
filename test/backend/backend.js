const Client = require("socket.io-client")
const assert = require("chai")

/** test cases */

describe("silex_socket_service", () => {
    let clientSocket
    const port = 3000

    before((done) => {

        clientSocket = new Client(`http://localhost:${port}/backend`)
        clientSocket.on("connect", () => {
            console.log("connected")
            // done()    <-- todo : need to find why this not work
        })
        done() 
    })

    after(() => {
        clientSocket.close()
    })

    it("Test connection", (done) => {
        clientSocket.on("connected", (arg) => {
            done()
        })
        clientSocket.emit("connection")
    })
})