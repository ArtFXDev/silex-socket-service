/* eslint-disable no-unused-vars */
const Client = require("socket.io-client");
const { expect } = require("chai");
const { it, describe, before, after, beforeEach } = require("mocha");
const store = require("../../src/store");

describe("Namespace /ui", () => {
  let uiNamespace;
  const port = 5118;

  before((done) => {
    console.log("ui");
    uiNamespace = new Client(`http://localhost:${port}/ui`);
    uiNamespace.on("connect", () => done());
  });

  after(() => {
    uiNamespace.disconnect();
  });

  beforeEach(() => {
    store.instance.data.runningActions = {};
    store.instance.data.dccs = {};
  });

  describe("actionUpdate", () => {
    it("Can't update an action when no uuid is given", (done) => {
      uiNamespace.emit("actionUpdate", { data: 0 }, (response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it("Can't update an action that doesn't exist", (done) => {
      uiNamespace.emit("actionUpdate", { uuid: "unknown" }, (response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it("Updates an action by replacing it", (done) => {
      store.instance.data.runningActions["submit"] = {
        uuid: "submit",
        context_metadata: { uuid: "blender" },
        status: 0,
      };

      const updatedAction = {
        uuid: "submit",
        context_metadata: { uuid: "blender" },
        status: 2,
        steps: { a: { status: 3 } },
      };

      uiNamespace.emit("actionUpdate", updatedAction, (response) => {
        expect(response.status).to.equal(200);
        expect(store.instance.data.runningActions["submit"]).to.deep.equal(
          updatedAction
        );
        done();
      });
    });
  });

  describe("clearAction", () => {
    it("Can't clear an action when no uuid is given", (done) => {
      uiNamespace.emit("clearAction", { data: 0 }, (response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it("Can't clear an action that doesn't exist", (done) => {
      uiNamespace.emit("clearAction", { uuid: "unknown" }, (response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it("Clears an action", (done) => {
      store.instance.data.runningActions["submit"] = {
        uuid: "submit",
        context_metadata: { uuid: "blender" },
        status: 0,
      };

      expect(Object.values(store.instance.data.runningActions)).to.be.lengthOf(
        1
      );

      uiNamespace.emit("clearAction", { uuid: "submit" }, (response) => {
        expect(response.status).to.equal(200);
        expect(store.instance.data.runningActions).to.be.empty;
        expect(store.instance.data.runningActions["submit"]).to.not.exist;
        done();
      });
    });
  });

  describe("getConnectedDccs", () => {
    it("Returns the current connected dccs", (done) => {
      store.instance.data.dccs["blender"] = { uuid: "blender" };
      store.instance.data.dccs["houdini"] = { uuid: "houdini" };

      uiNamespace.emit("getConnectedDccs", (response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.deep.equal({
          blender: { uuid: "blender" },
          houdini: { uuid: "houdini" },
        });
        done();
      });
    });
  });

  describe("getRunningActions", () => {
    it("Returns the current running actions", (done) => {
      const submit = {
        uuid: "submit",
        context_metadata: { uuid: "blender" },
        status: 0,
      };

      const conform = {
        uuid: "conform",
        context_metadata: { uuid: "houdini" },
        status: 1,
      };

      store.instance.data.runningActions["submit"] = submit;
      store.instance.data.runningActions["conform"] = conform;

      uiNamespace.emit("getRunningActions", (response) => {
        expect(response.status).to.equal(200);
        expect(response.data).to.deep.equal({
          conform,
          submit,
        });
        done();
      });
    });
  });

  describe("initialization", () => {
    it("Can't initialize a UI without an uuid", (done) => {
      uiNamespace.emit("initialization", { data: 0 }, (response) => {
        expect(response.status).to.equal(400);
        done();
      });
    });

    it("Initializes a UI", (done) => {
      uiNamespace.emit("initialization", { uuid: "random" }, (response) => {
        expect(response.status).to.equal(200);
        done();
      });
    });
  });
});
