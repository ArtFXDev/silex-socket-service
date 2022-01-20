const store = require("../../store");
const logger = require("../../utils/logger");


/**
 * /beforeExitEvent
 * 
 * last event call
 * Used to lcear all child process 
 */
const beforeExitEvent = (socket) => {
    socket.on("beforeExitEvent", () => {
        // get all child process from store
        process.on("exit", () => {
            const childrens = store.instance.data.subprocess
            console.log(`killing ${childrens.length}`);
            childrens.forEach((_child) => {
                _child.kill();
            }); 
        });
    })
}