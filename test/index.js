const { describe } = require("mocha");

describe("silex_socket_service_init_server", () => {
  require("../src/index").run();
});
