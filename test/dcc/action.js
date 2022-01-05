const Client = require("socket.io-client");
const { expect } = require("chai");
const { it, describe, before, after, beforeEach } = require("mocha");
const store = require("../../src/store");

describe("Namespace /dcc/action", () => {
  let dccActionNamespace;
  const port = 5118;

  before((done) => {
    console.log("action");
    dccActionNamespace = new Client(`http://localhost:${port}/dcc/action`);
    dccActionNamespace.on("connect", () => {
      done();
    });
  });

  after(() => {
    dccActionNamespace.disconnect();
  });

  // Clear the store before each test
  beforeEach(() => {
    store.instance.data.runningActions = {};
  });

  describe("clearAction", () => {
    it("Returns an error when no uuid is given", (done) => {
      dccActionNamespace.emit("clearAction", { data: 0 }, (response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it("Can't clear an action that doesn't exist", (done) => {
      dccActionNamespace.emit(
        "clearAction",
        { uuid: "doesntExist" },
        (response) => {
          expect(response.status).to.equal(400);
          done();
        }
      );
    });

    it("Clears the action", (done) => {
      dccActionNamespace.emit(
        "query",
        { uuid: "conform", context_metadata: { uuid: "blender" } },
        () => {
          expect(store.instance.data.runningActions["conform"]).to.exist;

          dccActionNamespace.emit(
            "clearAction",
            { uuid: "conform" },
            (response) => {
              expect(response.status).to.equal(200);
              expect(store.instance.data.runningActions["conform"]).to.not
                .exist;
              done();
            }
          );
        }
      );
    });
  });

  describe("initialization", () => {
    it("Returns an error when no uuid is given", (done) => {
      dccActionNamespace.emit(
        "initialization",
        { name: "blender" },
        (response) => {
          expect(response.status).to.equal(400);
          done();
        }
      );
    });

    it("Joins the room with it's uuid", (done) => {
      dccActionNamespace.emit(
        "initialization",
        { uuid: "dccUuid", name: "blender" },
        (response) => {
          expect(response.status).to.equal(200);
          done();
        }
      );
    });
  });

  describe("query", () => {
    it("Returns an error when no uuid is given", (done) => {
      dccActionNamespace.emit("query", { sample: 0 }, (response) => {
        expect(response.status).to.equal(400);
        expect(store.instance.data.runningActions).to.be.empty;
        done();
      });
    });

    it("Can't store an action that has no context metadata", (done) => {
      dccActionNamespace.emit(
        "query",
        { uuid: "hello", sample: 0 },
        (response) => {
          expect(response.status).to.equal(400);
          expect(store.instance.data.runningActions).to.be.empty;
          done();
        }
      );
    });

    it("Stores a new action", (done) => {
      const action = {
        uuid: "random",
        context_metadata: { uuid: "blender" },
        steps: { conform: "hello" },
      };

      dccActionNamespace.emit("query", action, (response) => {
        expect(response.status).to.equal(200);
        expect(store.instance.data.runningActions[action.uuid]).to.deep.equal(
          action
        );
        done();
      });
    });
  });

  describe("update", () => {
    it("Returns an error when no uuid is given", (done) => {
      dccActionNamespace.emit("update", { data: 0 }, (response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it("Can't update an action that doesn't exist", (done) => {
      dccActionNamespace.emit(
        "clearAction",
        { uuid: "doesntExist" },
        (response) => {
          expect(response.status).to.equal(400);
          done();
        }
      );
    });

    it("Updates an action with a diff", (done) => {
      const action = {
        uuid: "conform",
        context_metadata: { uuid: "blender" },
        steps: { a: { name: "a", status: 0, commands: { c: { name: "c" } } } },
      };

      dccActionNamespace.emit("query", action, () => {
        expect(store.instance.data.runningActions[action.uuid]).to.deep.equal(
          action
        );

        const diff = {
          uuid: "conform",
          steps: {
            a: { status: 3, commands: { c: { status: 1 } } },
            b: { name: "b", status: 3 },
          },
        };

        dccActionNamespace.emit("update", diff, (response) => {
          expect(response.status).to.equal(200);
          expect(store.instance.data.runningActions[action.uuid]).to.deep.equal(
            {
              uuid: "conform",
              context_metadata: { uuid: "blender" },
              steps: {
                a: {
                  name: "a",
                  status: 3,
                  commands: { c: { name: "c", status: 1 } },
                },
                b: { name: "b", status: 3 },
              },
            }
          );

          done();
        });
      });
    });
  });
});
