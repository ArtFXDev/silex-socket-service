module.exports = (io) => {
    const fs = require("fs")
    const path = require("path")

    // link listeners
    const listenersPath = path.resolve(__dirname)

    // reads found files
    fs.readdir(listenersPath, (err, files) => {
        if (err) {
            process.exit(1)
        }

        files.map((fileName) => {
            if (fileName !== "index.js") {
                console.debug("Initializing listener at: %s", fileName)

                // Requires file
                const listener = require(path.resolve(__dirname, fileName))

                // execs listener
                listener(io)
            }
        })
    })
}