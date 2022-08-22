/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import Mock from "../mock";
import { isMockBodyResponse, isMockDataResponse } from "../helpers";
import { MockDataResponse, MockBodyResponse } from "../types";

const resolveScenario = <Scenario extends keyof any, GetBodyArgs>(
  mock: Mock<Scenario, GetBodyArgs>,
  scenario: Scenario | MockBodyResponse | MockDataResponse<GetBodyArgs>
): MockBodyResponse => {
  if (isMockDataResponse(scenario)) {
    const { args, body, ...mockResponse } = scenario;

    if (mock.getBody === undefined) {
      throw Error(
        `Passed 'args' but 'getBody()' is undefined. To use 'args' you must defined 'getBody()' in your Mock instance first.`
      );
    }

    return {
      body: mock.getBody(args),
      ...mockResponse,
    };
  }

  if (isMockBodyResponse(scenario)) {
    return scenario;
  }

  return mock.scenario[scenario];
};

// It's a dummy oveload that solves a problem of Intelisense
// More: https://stackoverflow.com/a/72309674
function mockFn<K extends keyof any, GetBodyArgs>(
  mock: Mock<K, GetBodyArgs>,
  scenario: K | MockBodyResponse | MockDataResponse<GetBodyArgs>
): Cypress.Chainable<null>;

function mockFn<K extends keyof any, GetBodyArgs>(
  mock: Mock<K, GetBodyArgs>,
  scenario: K
): Cypress.Chainable<null>;

function mockFn<K extends keyof any, GetBodyArgs>(
  mock: Mock<K, GetBodyArgs>,
  scenario: MockBodyResponse
): Cypress.Chainable<null>;

function mockFn<K extends keyof any, GetBodyArgs>(
  mock: Mock<K, GetBodyArgs>,
  scenario: MockDataResponse<GetBodyArgs>
): Cypress.Chainable<null>;

function mockFn<K extends keyof any, GetBodyArgs>(
  mock: Mock<K, GetBodyArgs>,
  scenario: K | MockBodyResponse | MockDataResponse<GetBodyArgs>
): Cypress.Chainable<null> {
  const { method, route, alias } = mock;
  const response = resolveScenario(mock, scenario);

  return alias
    ? cy.intercept(method, route, response).as(alias.replace("@", ""))
    : cy.intercept(method, route, response);
}

export default mockFn;
