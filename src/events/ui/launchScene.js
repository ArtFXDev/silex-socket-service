const logger = require("../../plugins/logger");
const { spawn } = require("child_process");
const path = require("path");

/**
 * /ui launchScene
 *
 * Called when the UI wants
 */
const launchScene = (socket) => {
  socket.on("launchScene", (data, callback) => {
    logger.infoReceiveMessage("/ui", "launchScene", data);

    // ex: rez env silex_houdini -- silex launch --task-id id --dcc houdini
    let args = [
      "env",
      `silex_${data.dcc}`,
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
    if (data.scene && data.path) {
      args = args.concat(["--file", path.join(data.path, data.scene)]);
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
