const logger = require("../../plugins/logger");
const { spawn } = require("child_process");

/**
 * /ui launchAction
 *
 * Called when the UI fires an action.
 */
const launchAction = (socket) => {
  socket.on("launchAction", (data) => {
    logger.infoReceiveMessage("/ui", "launchAction", data);

    const rez_requires = ["env", "silex_client"];

    // Add a dcc if we are launching the action from a dcc
    if (data.dcc) rez_requires.push(data.dcc);

    // Same for the project
    if (data.projectName) rez_requires.push(data.projectName.toLowerCase());

    let silex_cmd = ["silex", "action", data.action];

    // Add the optional task id
    if (data.taskId) {
      silex_cmd = silex_cmd.concat(["--task-id", data.taskId]);
    }

    // Build the final command
    const args = rez_requires.concat("--", silex_cmd);

    // Spawn a rez env with a silex action
    const action = spawn("rez", args);
    logger.info(`Launching action with command: rez ${args.join(" ")}`);

    action.stdout.on("data", (data) => {
      logger.info(`stdout: ${data}`);
    });

    action.stderr.on("data", (data) => {
      logger.error(`stderr: ${data}`);
    });
  });
};

module.exports = launchAction;
