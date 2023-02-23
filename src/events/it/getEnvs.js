const store = require("../../store");
const logger = require("../../utils/logger");
var process = require("child_process");
/**
 * /it getEnvs
 *
 * Called when the UI ask for the list of connected clients
 */
const getEnvs = (socket) => {
  socket.on("getEnvs", (callback) => {
    logger.debugReceiveMessage("/it", "getEnvs");
    logger.debugSendMessage("/it", "getEnvs");

    // todo need to find another way to avoid os dependency
    try {
      process.exec(
        'powershell.exe "Get-ChildItem env: | Select-Object -Property Key,value | ConvertTo-Json"',
        (err, stdout, stderr) => {
          if (err) {
            callback({
              status: 500,
              msg: "err",
            });
          } else {
            callback({
              status: 200,
              msg: "Ok",
              data: { envs: stdout },
            });
            console.log(stdout);
          }
        }
      );
    } catch (err) {
      callback({ status: 500, msg: JSON.stringify(err) });
    }
  });
};

module.exports = getEnvs;
