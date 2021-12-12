const logger = require("../../utils/logger");
const { spawn } = require("child_process");

/**
 * /ui launchScene
 *
 * Called when the UI wants
 */
const launchScene = (socket) => {
  socket.on("launchScene", (data, callback) => {
    logger.debugReceiveMessage("/ui", "launchScene", data);

    // ex: rez env silex_houdini -- silex launch --task-id id --dcc houdini
    let args = [
      "env",
      `silex_${data.dcc}${data.mode ? "-" + data.mode : ""}`,
      data.projectName.toLowerCase(),
      "--",
      "silex",
      "launch",
      "--task-id",
      data.taskId,
      "--dcc",
      data.dcc,
    ];

    // If we pass a file
    if (data.scene) {
      args = args.concat(["--file", data.scene]);
    }

    // Spawn a rez subprocess
    const launch = spawn("rez", args);

    logger.info(`Launching scene with command: rez ${args.join(" ")}`);

    launch.stdout.on("data", (data) => {
      logger.info(`stdout: ${data}`);
    });

    launch.stderr.on("data", (data) => {
      logger.error(`stderr: ${data}`);
    });

    callback({
      status: 200,
      msg: "Ok",
    });
  });
};

module.exports = launchScene;
