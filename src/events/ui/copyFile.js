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

    const destDir = path.dirname(request.destination);

    fs.mkdir(destDir, { recursive: true }, (err) => {
      if (err) callback({ status: 500, msg: err });

      fs.copyFile(request.source, request.destination, (err) => {
        if (err) {
          callback({ status: 500, msg: err });
        }

        callback({
          status: 200,
          msg: "Ok",
          data: { destination: request.destination },
        });
      });
    });
  });
};

module.exports = copyFile;
