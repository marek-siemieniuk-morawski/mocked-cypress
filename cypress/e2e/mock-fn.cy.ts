import mockFn from "../../src/commands/mock-fn";
import CypressMock from "../../src/cypress-mock";

describe("mockFn()", () => {
  describe("second argument typeof Scenario", () => {
    it("calls cy.intercept with mock.scenario[scenarioName]", () => {
      const cyInterceptSpy = cy.stub(cy, "intercept");
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

      const { method, route } = mock;
      const scenario = mock.scenarios.foo;

      mockFn(mock, "foo");

      expect(cyInterceptSpy).to.be.calledWith(method, route, {
        statusCode: scenario.statusCode,
        body: scenario.body,
      });
    });
  });

  describe("second argument typeof ExplicitScenario", () => {
    it(`calls cy.intercept with { body: getBody(data) } if both are defined`, () => {
      const cyInterceptSpy = cy.stub(cy, "intercept");
      const mock = CypressMock.new({
        route: "",
        method: "GET",
        getBodyFn: (data: { bar: string }) => ({ bar: data.bar }),
        scenarios: {
          foo: {
            statusCode: 200,
            body: {
              bar: "bar",
            },
          },
        },
      });

      const { method, route } = mock;

      mockFn(mock, { statusCode: 400, props: { bar: "baz" } });

      expect(cyInterceptSpy).to.not.be.calledWith(method, route, {
        statusCode: 200,
        body: { bar: "bar" },
      });
      expect(cyInterceptSpy).to.be.calledWith(method, route, {
        statusCode: 400,
        body: { bar: "baz" },
      });
    });

    it(`throws error if props are defined but getBody is undefined`, () => {
      const mock = CypressMock.new({
        route: "",
        method: "GET",
        scenarios: {
          foo: {
            statusCode: 200,
            body: {
              bar: "bar",
            },
          },
        },
      });

      expect(() =>
        mockFn(mock, { statusCode: 400, props: { bar: "baz" } })
      ).to.throw("");
    });

    it(`calls cy.intercept with { body: body } if props are undefined`, () => {
      const cyInterceptSpy = cy.stub(cy, "intercept");
      const mock = CypressMock.new({
        route: "",
        method: "GET",
        scenarios: {
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
