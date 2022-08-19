import Mock from "../../src/mock";

describe("Mock", () => {
  describe("new()", () => {
    it("sets alias as undefined if it is not given", () => {
      const mock = Mock.new({
        route: "",
        method: "GET",
        scenario: {
          success: {
            statusCode: 200,
            body: {},
          },
        },
      });

      // eslint-disable-next-line no-unused-expressions
      expect(mock.alias).to.be.undefined;
    });

    it("sets `@foo` alias even if passed `foo` without @ character", () => {
      const alias = "fooAlias";

      const mock = Mock.new({
        route: "",
        method: "GET",
        alias,
        scenario: {
          success: {
            statusCode: 200,
            body: {},
          },
        },
      });

      expect(mock.alias).to.be.equal(`@${alias}`);
    });

    it("sets `@foo` alias if passed `@foo` with @ character", () => {
      const alias = "@fooAlias";

      const mock = Mock.new({
        route: "",
        method: "GET",
        alias,
        scenario: {
          success: {
            statusCode: 200,
            body: {},
          },
        },
      });

      expect(mock.alias).to.be.equal(alias);
    });
  });
});
