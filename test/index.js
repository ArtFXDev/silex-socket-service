const { describe } = require("mocha");

describe("Starting the server", () => {
  require("../src/index").run();
});
