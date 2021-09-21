const dccEvent = (namespace) => {
  namespace.to("dccRoom").emit("ondcc", "myData")
}

module.exports = dccEvent
