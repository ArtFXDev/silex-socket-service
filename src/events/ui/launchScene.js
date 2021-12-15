const logger = require("../../utils/logger");
const store = require("../../store");
const { spawn } = require("child_process");

/**
 * /ui launchScene
 *
 * Called when the UI wants
 */
const launchScene = (socket) => {
  socket.on("launchScene", (data, callback) => {
    logger.debugReceiveMessage("/ui", "launchScene", data);

    // Construct the rez command parameters
    let args = [
      "env",
      `silex_${data.dcc}-${store.instance.data.rezPackagesMode}`, // silex_client-{prod,beta,dev}
      data.projectName.toLowerCase(), // Add the project package
      "--",
      "silex",
      "launch",
      data.dcc,
      "--task-id",
      data.taskId,
    ];

    // If we want to open a file with that dcc
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
