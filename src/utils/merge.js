const deepmerge = require("deepmerge");

const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

function merge(current, update) {
  return deepmerge(current, update, { arrayMerge: overwriteMerge });
}

module.exports = merge;
