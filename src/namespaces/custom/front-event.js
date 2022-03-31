/**
 * Shorthand for the front-event namespace
 */
const frontEvent = (io) => {
  return io.of("/front-event");
};

module.exports = frontEvent;
