const logger = require("../../utils/logger");
const store = require("../../store");
const { spawn } = require("child_process");

/**
 * /ui launchAction
 *
 * Called when the UI fires an action.
 */
const launchAction = (socket) => {
  socket.on("launchAction", (data) => {
    logger.debugReceiveMessage("/ui", "launchAction", data);

    const rez_requires = ["env"];

    // Add a dcc if we are launching the action from a dcc
    if (data.dcc) {
      rez_requires.push(
        `silex_${data.dcc}-${store.instance.data.rezPackagesMode}`
      );
    } else {
      rez_requires.push(`silex_client-${store.instance.data.rezPackagesMode}`);
    }

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
    const fullCommand = `rez ${args.join(" ")}`;
    logger.info(`Launching action with command: ${fullCommand}`);

    // Capture program output
    action.stdout.on("data", (data) => {
      logger.info(`-> [${fullCommand}]: ${data}`);
    });

    action.stderr.on("data", (data) => {
      logger.error(`-> [${fullCommand}]: ${data}`);
    });
  });
};

module.exports = launchAction;
