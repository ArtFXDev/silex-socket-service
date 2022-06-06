function hasValidFrameNumber(filename) {
  const tokens = filename.split(".");
  if (tokens.length < 2) return false;
  return !isNaN(parseInt(tokens[tokens.length - 2]));
}

function getFileStem(filename) {
  return filename.split(".").slice(0, -2).join(".");
}

function getFileNumber(filename) {
  const tokens = filename.split(".");
  return parseInt(tokens[tokens.length - 2]);
}

function getFileExtension(filename) {
  const tokens = filename.split(".");
  return tokens[tokens.length - 1];
}

function findSequencesIn(files) {
  // See: https://dbushell.com/2021/05/17/javascript-natural-alphanumeric-sorting/
  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });

  const otherFiles = files.filter((f) => !hasValidFrameNumber(f));
  files = files
    .filter(hasValidFrameNumber)
    .sort((a, b) => collator.compare(a, b));

  const fileSequences = [];
  let i = 0;

  while (i < files.length) {
    const file = files[i];
    const name = getFileStem(file);
    const fileNumber = getFileNumber(file);
    let endFileNumber = fileNumber;

    const addSequenceOrFile = () => {
      if (endFileNumber !== fileNumber) {
        fileSequences.push({
          name,
          isSequence: true,
          start: fileNumber,
          end: endFileNumber,
          extension: getFileExtension(file),
        });
      } else {
        fileSequences.push({ name: file, isSequence: false });
      }
    };

    // It's the end of
    if (i + 1 >= files.length) {
      addSequenceOrFile();
      break;
    }

    for (let j = i + 1; j < files.length; j++) {
      const otherName = getFileStem(files[j]);
      const otherFileNumber = getFileNumber(files[j]);

      // It's the next file in the sequence
      if (name === otherName && otherFileNumber === endFileNumber + 1) {
        endFileNumber = otherFileNumber;

        if (j === files.length - 1) {
          addSequenceOrFile();
          i = files.length;
          break;
        }
      } else {
        // It's a different file so we potentially start a new sequence
        addSequenceOrFile();

        i = j;
        break;
      }
    }
  }

  // Add back files that doesn't have any file number
  otherFiles.forEach((f) => fileSequences.push({ name: f, isSequence: false }));

  return fileSequences;
}

module.exports = {
  getFileStem,
  getFileExtension,
  getFileNumber,
  hasValidFrameNumber,
  findSequencesIn,
};
