/* eslint-disable no-unused-vars */
const Client = require("socket.io-client");
const socketService = require("../../src/index");
const { expect } = require("chai");
const { it, describe, before, after, beforeEach } = require("mocha");

describe("Namespace /it", () => {
  let itNamespace;
  const port = 5118;

  before((done) => {
    socketService.initialize();
    socketService.run();

    itNamespace = new Client(`http://localhost:${port}/it`);
    itNamespace.on("connect", () => done());
  });
  
  after(() => {
    itNamespace.disconnect();
    socketService.close();
  });

  describe("getEnvs", () => {
    it("Returns envs of computer", (done) => {
      itNamespace.emit("getEnvs", (response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.deep.equal({
          testenv: "aaaaa",
        });
        done();
      });
    });
  });
});
