const { describe } = require("mocha");
const socketService = require("../src/index");

describe("Starting the server", () => {
  socketService.initialize();
  socketService.run();
});
