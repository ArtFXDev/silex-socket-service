const logger = require("../../utils/logger");
const process = require("process");

/**
 * Tries to kill a process and check if it's still up then resolves the promise
 * Taken from: https://stackoverflow.com/questions/61520432/wait-for-process-kill-to-terminate-the-process
 */
const killProcessAsync = (pid, timeout) =>
  new Promise((resolve, reject) => {
    process.kill(pid, "SIGTERM");
    let count = 0;
    setInterval(() => {
      try {
        process.kill(pid, 0);
      } catch (e) {
        // the process does not exists anymore
        resolve();
      }
      if ((count += 100) > timeout) {
        reject(new Error("Timeout process kill"));
      }
    }, 100);
  });

/**
 * /ui killProcess
 *
 * Asks to kill a process given a pid (used to kill actions running)
 */
const killProcess = (socket) => {
  socket.on("killProcess", (data, callback) => {
    logger.debugReceiveMessage("/ui", "killProcess", data.pid);

    if (!data.pid) {
      callback({ status: 400, msg: "Please give an uuid" });
      return;
    }

    killProcessAsync(data.pid, 2000)
      .then(() => {
        callback({
          status: 200,
          msg: `Process ${data.pid} killed`,
        });
      })
      .catch((err) => {
        logger.error(`Can't kill process with pid ${data.pid}: ${err}`);
        callback({
          status: 500,
          msg: err.message,
        });
      });
  });
};

module.exports = killProcess;
