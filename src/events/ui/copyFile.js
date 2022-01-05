const logger = require("../../utils/logger");
const fs = require("fs");
const path = require("path");

/**
 * /ui copyFile
 *
 * Copy a file from source to destination
 */
const copyFile = (socket) => {
  socket.on("copyFile", (request, callback) => {
    logger.debugReceiveMessage("/ui", "copyFile", request);

    const source = path.resolve(request.source);
    const destination = path.resolve(request.destination);
    const destDir = path.dirname(destination);

    try {
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      fs.copyFileSync(
        source,
        destination,
        request.errorOnDestExist ? fs.constants.COPYFILE_EXCL : undefined
      );

      callback({
        status: 200,
        msg: "Ok",
        data: { destination: destination },
      });
    } catch (err) {
      callback({ status: 500, msg: err });
    }
  });
};

module.exports = copyFile;
