import CypressMock from "../../src/cypress-mock";

describe("CypressMock", () => {
  describe("CypressMock.new()", () => {
    it("sets alias as undefined if it is not given", () => {
      const mock = CypressMock.new({
        route: "",
        method: "GET",
        scenarios: {
          foo: {
            statusCode: 200,
            body: {},
          },
        },
      });

      // eslint-disable-next-line no-unused-expressions
      expect(mock.alias).to.be.undefined;
    });

    it("adds a trailing @ character if it is missing", () => {
      const alias = "fooAlias";

      const mock = CypressMock.new({
        route: "",
        method: "GET",
        alias,
        scenarios: {
          foo: {
            statusCode: 200,
            body: {},
          },
        },
      });

      expect(mock.alias).to.be.equal(`@${alias}`);
    });

    it("sets alias as it is if a trailing @ character is there", () => {
      const alias = "@fooAlias";

      const mock = CypressMock.new({
        route: "",
        method: "GET",
        alias,
        scenarios: {
          foo: {
            statusCode: 200,
            body: {},
          },
        },
      });

      expect(mock.alias).to.be.equal(alias);
    });
  });
});
