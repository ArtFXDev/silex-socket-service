const dccEvent = (namespace) => {
    namespace.to("dccRoom").emit("ok", "myData")
}

module.exports = dccEvent