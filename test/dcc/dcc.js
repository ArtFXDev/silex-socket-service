const Client = require("socket.io-client");
const { expect } = require("chai");
const { it, describe, before, beforeEach, after } = require("mocha");
const store = require("../../src/store");
const socketService = require("../../src/index");

describe("Namespace /dcc", () => {
  let dccNamespace;
  const port = 5118;

  before((done) => {
    socketService.initialize();
    socketService.run();

    dccNamespace = new Client(`http://localhost:${port}/dcc`);
    dccNamespace.on("connect", () => {
      done();
    });
  });

  after(() => {
    dccNamespace.disconnect();
    socketService.close();
  });

  beforeEach(() => {
    store.instance.data.runningActions = {};
    store.instance.data.dccs = {};
  });

  describe("initialization", () => {
    it("Returns an error when no uuid is given", (done) => {
      dccNamespace.emit("initialization", { data: 0 }, (response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it("Initializes the dcc", (done) => {
      const context = { uuid: "blender", pid: 5689 };

      dccNamespace.emit("initialization", { context }, (response) => {
        expect(response.status).to.equal(200);
        expect(store.instance.data.dccs["blender"]).to.deep.equal(context);
        done();
      });
    });
  });

  describe("disconnect", () => {
    it("Removes all actions associated with that dcc", (done) => {
      const context = { uuid: "blender" };

      dccNamespace.on("disconnect", () => {
        setTimeout(() => {
          expect(store.instance.data.runningActions).to.deep.equal({
            b: { uuid: "b", context_metadata: { uuid: "houdini" } },
          });
          done();
        }, 100);
      });

      dccNamespace.emit("initialization", { context }, () => {
        expect(store.instance.data.dccs["blender"]).to.exist;

        const dccActionNamespace = new Client(
          `http://localhost:${port}/dcc/action`
        );

        function actionPromise(action) {
          return new Promise((resolve) =>
            dccActionNamespace.emit("query", action, () => resolve())
          );
        }

        const actions = [
          { uuid: "a", context_metadata: context },
          { uuid: "b", context_metadata: { uuid: "houdini" } },
          { uuid: "c", context_metadata: context },
        ];

        dccActionNamespace.on("connect", () => {
          Promise.all(actions.map((a) => actionPromise(a))).then(() => {
            expect(
              Object.values(store.instance.data.runningActions)
            ).to.deep.equal(actions);
            dccNamespace.disconnect();
          });
        });
      });
    });
  });
});
