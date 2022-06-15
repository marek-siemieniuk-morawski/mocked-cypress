import mockFn from "../../src/mock-fn";
import Mock from "../../src/mock";

describe("mockFn()", () => {
  describe("one argument", () => {
    it(`calls cy.intercept with default scenario`, () => {
      const cyInterceptSpy = cy.stub(cy, "intercept");
      const mock = Mock.new({
        route: "",
        method: "GET",
        scenario: {
          foo: {
            statusCode: 200,
            default: true,
            body: {},
          },
        },
      });

      const { method, route, defaultScenario } = mock;
      const scenario = defaultScenario;

      mockFn(mock);

      expect(cyInterceptSpy).to.be.calledWith(method, route, {
        statusCode: scenario?.statusCode,
        body: scenario?.body,
      });
    });

    it(`throws error if passed mock has no default scenario`, () => {
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

      expect(() => mockFn(mock)).to.throw("");
    });
  });

  describe("second argument: ScenarioName", () => {
    it("calls cy.intercept with mock.scenario[scenarioName]", () => {
      const cyInterceptSpy = cy.stub(cy, "intercept");
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

      const { method, route } = mock;
      const scenario = mock.scenario.foo;

      mockFn(mock, "foo");

      expect(cyInterceptSpy).to.be.calledWith(method, route, {
        statusCode: scenario.statusCode,
        body: scenario.body,
      });
    });
  });

  describe("second argument: MockResponse", () => {
    it(`calls cy.intercept with { body: getBody(data) } if both are defined`, () => {
      const cyInterceptSpy = cy.stub(cy, "intercept");
      const mock = Mock.new({
        route: "",
        method: "GET",
        getBody: (data: { bar: string }) => ({ bar: data.bar }),
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

      mockFn(mock, { statusCode: 400, data: { bar: "baz" } });

      expect(cyInterceptSpy).to.not.be.calledWith(method, route, {
        statusCode: 200,
        body: { bar: "bar" },
      });
      expect(cyInterceptSpy).to.be.calledWith(method, route, {
        statusCode: 400,
        body: { bar: "baz" },
      });
    });

    it(`throws error if data is defined but getBody is undefined`, () => {
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
        mockFn(mock, { statusCode: 400, data: { bar: "baz" } })
      ).to.throw("");
    });

    it(`calls cy.intercept with { body: body } if data is undefined`, () => {
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
