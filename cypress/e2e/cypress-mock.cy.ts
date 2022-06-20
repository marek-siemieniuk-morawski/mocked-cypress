import CypressMock from "../../src/cypress-mock";

describe("CypressMock", () => {
  describe("CypressMock.new()", () => {
    it(`does not set defaultScenario if no scenario with default: true`, () => {
      const mock = CypressMock.new({
        route: "",
        method: "GET",
        scenario: {
          foo: {
            statusCode: 200,
            body: {},
          },
        },
      });

      // eslint-disable-next-line no-unused-expressions
      expect(mock.defaultScenario).to.be.undefined;
    });

    it(`sets defaultScenario if only one scenario with default: true`, () => {
      const foo = {
        statusCode: 200,
        default: true,
        body: {},
      };

      const mock = CypressMock.new({
        route: "",
        method: "GET",
        scenario: {
          foo,
        },
      });

      expect(mock.defaultScenario).to.be.equal(foo);
    });

    it(`throws an error if more than one scenario with default: true`, () => {
      const newMockFn = () =>
        CypressMock.new({
          route: "",
          method: "GET",
          scenario: {
            foo: {
              statusCode: 200,
              default: true,
              body: {},
            },
            bar: {
              statusCode: 200,
              default: true,
              body: {},
            },
          },
        });

      expect(newMockFn).to.throw(
        `Only one scenario can be a default one. Default scenarios: ${[
          "foo",
          "bar",
        ]}`
      );
    });

    it("sets alias as undefined if it is not given", () => {
      const mock = CypressMock.new({
        route: "",
        method: "GET",
        scenario: {
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
        scenario: {
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
        scenario: {
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
