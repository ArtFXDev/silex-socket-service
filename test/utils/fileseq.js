const { it, describe } = require("mocha");
const { expect } = require("chai");
const {
  hasValidFrameNumber,
  getFileStem,
  getFileExtension,
  getFileNumber,
  findSequencesIn,
} = require("../../src/utils/fileseq");

describe("Fileseq", () => {
  describe("Extract file information", () => {
    it("Detects if the file has the right number syntax", () => {
      expect(hasValidFrameNumber("a.txt")).to.be.false;
      expect(hasValidFrameNumber("a")).to.be.false;
      expect(hasValidFrameNumber("a.001")).to.be.false;
      expect(hasValidFrameNumber("a.001.aa.txt")).to.be.false;

      expect(hasValidFrameNumber("a.001.txt"));
      expect(hasValidFrameNumber("fkjshfksfhe.dksjefh.0001.txt"));
      expect(hasValidFrameNumber("hello.123457.txt"));
    });

    it("Gets the file name", () => {
      expect(getFileStem("hello.001.txt")).to.equal("hello");
      expect(getFileStem("hello.a.0001.txt")).to.equal("hello.a");
      expect(getFileStem("impossible_is.1234.txt")).to.equal("impossible_is");
    });

    it("Gets the extension", () => {
      expect(getFileExtension("hello.001.txt")).to.equal("txt");
      expect(getFileExtension("impossible_is.1234.txt")).to.equal("txt");
      expect(
        getFileExtension(
          "test_pipe_s01_p010_animation_main_publish_v000_render_vray_defaultRenderLayer.0018.exr"
        )
      ).to.equal("exr");
    });

    it("Gets the file number", () => {
      expect(getFileNumber("hello.001.txt")).to.equal(1);
      expect(getFileNumber("impossible_is.1234.txt")).to.equal(1234);
      expect(
        getFileNumber(
          "test_pipe_s01_p010_animation_main_publish_v000_render_vray_defaultRenderLayer.0018.exr"
        )
      ).to.equal(18);
    });
  });

  describe("Find sequences in a list of files", () => {
    it("Doesn't find any sequence", () => {
      expect(findSequencesIn(["a.txt", "b.txt"])).to.deep.equal([
        { name: "a.txt", isSequence: false },
        { name: "b.txt", isSequence: false },
      ]);
    });

    it("Doesn't find any sequence even if one file has a file number", () => {
      expect(findSequencesIn(["a.txt", "b.0001.txt"])).to.deep.equal([
        { name: "b.0001.txt", isSequence: false },
        { name: "a.txt", isSequence: false },
      ]);
    });

    it("Finds a file sequence alone", () => {
      expect(
        findSequencesIn([
          "b.0001.txt",
          "b.0002.txt",
          "b.0003.txt",
          "b.0004.txt",
          "b.0005.txt",
        ])
      ).to.deep.equal([
        { name: "b", extension: "txt", isSequence: true, start: 1, end: 5 },
      ]);

      expect(
        findSequencesIn([
          "render_s03_p260_body_layer.1000.ass",
          "render_s03_p260_body_layer.1001.ass",
          "render_s03_p260_body_layer.1002.ass",
          "render_s03_p260_body_layer.1003.ass",
        ])
      ).to.deep.equal([
        {
          name: "render_s03_p260_body_layer",
          extension: "ass",
          isSequence: true,
          start: 1000,
          end: 1003,
        },
      ]);
    });

    it("Finds a file sequence with other files", () => {
      expect(
        findSequencesIn([
          "b.0001.txt",
          "b.0002.txt",
          "b.txt",
          "b.0003.txt",
          "b.0004.txt",
          "b.0005.txt",
          "c.exr",
        ])
      ).to.deep.equal([
        { name: "b", extension: "txt", isSequence: true, start: 1, end: 5 },
        { name: "b.txt", isSequence: false },
        { name: "c.exr", isSequence: false },
      ]);
    });

    it("Finds two file sequences", () => {
      expect(
        findSequencesIn([
          "b.0001.txt",
          "b.0002.txt",
          "b.0004.txt",
          "b.0005.txt",
        ])
      ).to.deep.equal([
        { name: "b", extension: "txt", isSequence: true, start: 1, end: 2 },
        { name: "b", extension: "txt", isSequence: true, start: 4, end: 5 },
      ]);
    });

    it("Finds multiple file sequences", () => {
      expect(
        findSequencesIn([
          "b.0001.txt",
          "hello.1234.exr",
          "b.0002.txt",
          "hello.1235.exr",
          "b.0004.txt",
          "hello.1236.exr",
          "b.0005.txt",
          "hello.1240.exr",
        ])
      ).to.deep.equal([
        { name: "b", extension: "txt", isSequence: true, start: 1, end: 2 },
        { name: "b", extension: "txt", isSequence: true, start: 4, end: 5 },
        {
          name: "hello",
          extension: "exr",
          isSequence: true,
          start: 1234,
          end: 1236,
        },
        { name: "hello.1240.exr", isSequence: false },
      ]);
    });
  });
});
