const logger = require("../../utils/logger");
const store = require("../../store");
const spawn = require("child_process").spawn 

/**
 * /execPython initialization
 *
 * This initialization will launch the main loop of a socketio client python
 * this loop listen for request and execute it
 */

const initialization = (socket, io) => {
    socket.on("")
    
}