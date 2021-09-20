const room1Join = (socket) => {
    socket.join("room1")
}

const room1To = (socket) => {
    socket.To("room1")
}


module.exports = { room1Join, room1To }