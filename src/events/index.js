module.exports = io => {
    const fs = require("fs")
    const path = require("path")

    const eventsPath = path.resolve(__dirname)

    fs.readdir(eventsPath, (err, files) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }

        files.map(fileName => {
            if (fileName !== "index.js") {
                module.exports[fileName] = require(path.resolve(__dirname, fileName))
            }
        })
    })
}