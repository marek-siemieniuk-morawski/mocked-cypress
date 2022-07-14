/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import CypressMock from "../cypress-mock";
import { isExplicitScenario } from "../helpers";
import { ExplicitScenario, MockResponse } from "../types";

const resolveScenario = <Scenario extends keyof any, GetBodyFnProps>(
  mock: CypressMock<Scenario, GetBodyFnProps>,
  scenario: Scenario | ExplicitScenario<GetBodyFnProps>
): MockResponse => {
  if (isExplicitScenario(scenario)) {
    const { props, body, ...mockResponse } = scenario;

    if (props !== undefined) {
      if (mock.getBodyFn === undefined) {
        throw Error("Defined `props` but getBodyFn() is undefined");
      }

      return {
        body: mock.getBodyFn(props),
        ...mockResponse,
      };
    }

    return {
      body,
      ...mockResponse,
    };
  }

  return mock.scenarios[scenario];
};

function mockFn<Scenario extends keyof any, GetBodyFnProps>(
  mock: CypressMock<Scenario, GetBodyFnProps>,
  scenario: Scenario
): Cypress.Chainable<null>;

function mockFn<Scenario extends keyof any, GetBodyFnProps>(
  mock: CypressMock<Scenario, GetBodyFnProps>,
  scenario: ExplicitScenario<GetBodyFnProps>
): Cypress.Chainable<null>;

function mockFn<Scenario extends keyof any, GetBodyFnProps>(
  mock: CypressMock<Scenario, GetBodyFnProps>,
  scenario: Scenario | ExplicitScenario<GetBodyFnProps>
): Cypress.Chainable<null> {
  const { method, route, alias } = mock;
  const response = resolveScenario(mock, scenario);

  return alias
    ? cy.intercept(method, route, response).as(alias.replace("@", ""))
    : cy.intercept(method, route, response);
}

export default mockFn;
