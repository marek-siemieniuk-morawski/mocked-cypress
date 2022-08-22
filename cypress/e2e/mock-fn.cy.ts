import mockFn from "../../src/commands/mock-fn";
import Mock from "../../src/mock";

describe("mockFn()", () => {
  describe("second argument is type of string", () => {
    it("calls cy.intercept() with mock.scenario[scenarioName]", () => {
      const cyInterceptSpy = cy.stub(cy, "intercept");
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

      const { method, route } = mock;
      const scenario = mock.scenario.success;

      mockFn(mock, "success");

      expect(cyInterceptSpy).to.be.calledWith(method, route, {
        statusCode: scenario.statusCode,
        body: scenario.body,
      });
    });
  });

  describe("second argument is type of MockDataResponse", () => {
    it(`calls cy.intercept() with body: getBody(data) if getBody() is defined`, () => {
      const cyInterceptSpy = cy.stub(cy, "intercept");
      const mock = Mock.new({
        route: "",
        method: "GET",
        getBody: (args: { bar: string }) => ({ bar: args.bar }),
        scenario: {
          success: {
            statusCode: 200,
            body: {
              bar: "bar",
            },
          },
        },
      });

      const { method, route } = mock;

      mockFn(mock, { statusCode: 400, args: { bar: "baz" } });

      expect(cyInterceptSpy).to.not.be.calledWith(method, route, {
        statusCode: 200,
        body: { bar: "bar" },
      });
      expect(cyInterceptSpy).to.be.calledWith(method, route, {
        statusCode: 400,
        body: { bar: "baz" },
      });
    });

    it(`throws an error if getBody() is undefined`, () => {
      const mock = Mock.new({
        route: "",
        method: "GET",
        scenario: {
          foo: {
            statusCode: 200,
            body: {
              bar: "bar",
            },
          },
        },
      });

      expect(() =>
        // @ts-ignore: I want it to throw an error in runtime
        mockFn(mock, { statusCode: 400, args: { bar: "baz" } })
      ).to.throw();
    });
  });

  describe("third argument is type of MockBodyResponse", () => {
    it(`calls cy.intercept() with body: body`, () => {
      const cyInterceptSpy = cy.stub(cy, "intercept");
      const mock = Mock.new({
        route: "",
        method: "GET",
        scenario: {
          foo: {
            statusCode: 200,
            body: {
              bar: "bar",
            },
          },
        },
      });

      const { method, route } = mock;

      mockFn(mock, { statusCode: 400, body: { bar: "bar" } });
      expect(cyInterceptSpy).to.be.calledWith(method, route, {
        statusCode: 400,
        body: { bar: "bar" },
      });
    });
  });
});
