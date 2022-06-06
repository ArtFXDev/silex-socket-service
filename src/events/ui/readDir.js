const logger = require("../../utils/logger");
const fs = require("fs");
const path = require("path");
const { isJunk } = require("../../utils/junk");
const { findSequencesIn } = require("../../utils/fileseq");

/**
 * /ui readDir
 *
 * Read files and folders inside the given folder
 *
 * It only returns one depth in the filesystem because it's only requested when
 * the user clicks on a folder
 */
const readDir = (socket) => {
  socket.on("readDir", (request, callback) => {
    logger.debugReceiveMessage("/ui", "readDir", request);

    if (!fs.existsSync(request.path)) {
      callback({
        status: 404,
        msg: `Folder ${request.path.split("/").slice(-1)[0]} doesn't exist...`,
      });
    }

    try {
      const children = fs.readdirSync(request.path);

      // Filter hidden and junk files
      const entries = children.filter(
        (filename) => request.includeHiddenFiles || !isJunk(filename)
      );
      // Find sequences in that folder
      const sequences = findSequencesIn(entries);

      for (const sequenceOrFile of sequences) {
        if (sequenceOrFile.isSequence) {
          let lastDate = new Date(1970);

          for (let i = sequenceOrFile.start; i <= sequenceOrFile.end; i++) {
            const zf = i.toString().padStart(4, "0");
            const filePath = `${request.path}/${sequenceOrFile.name}.${zf}.${sequenceOrFile.extension}`;
            const stat = fs.statSync(filePath);
            if (stat.mtime > lastDate) lastDate = stat.mtime;
          }

          sequenceOrFile.mtime = lastDate;
          sequenceOrFile.isDirectory = false;
          sequenceOrFile.path = request.path;
        } else {
          const filePath = `${request.path}/${sequenceOrFile.name}`;
          const stat = fs.statSync(filePath);
          sequenceOrFile.isDirectory = stat.isDirectory();
          sequenceOrFile.mtime = stat.mtime;
          sequenceOrFile.path = filePath;
        }
      }

      callback({
        status: 200,
        msg: "Ok",
        data: { entries: sequences },
      });
    } catch (err) {
      callback({ status: 500, msg: JSON.stringify(err) });
    }
  });
};

module.exports = readDir;
