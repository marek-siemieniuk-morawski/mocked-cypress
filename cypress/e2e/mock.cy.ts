import Mock from "../../src/mock";

describe("Mock", () => {
  describe("Mock.new()", () => {
    it(`does not set defaultScenario if no scenario with default: true`, () => {
      const mock = Mock.new({
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

      const mock = Mock.new({
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
        Mock.new({
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
  });
});
