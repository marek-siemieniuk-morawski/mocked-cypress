/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import CypressMock from "./cypress-mock";
import { RecordKey, isCypressMockResponse, CypressMockResponse } from "./types";

function mockFn<Scenario extends RecordKey, GetBodyData, Body>(
  mock: CypressMock<Scenario, GetBodyData, Body>,
  scenario: Scenario
): Cypress.Chainable<null>;

function mockFn<Scenario extends RecordKey, GetBodyData, Body>(
  mock: CypressMock<Scenario, GetBodyData, Body>,
  scenario: CypressMockResponse<Body>
): Cypress.Chainable<null>;

function mockFn<Scenario extends RecordKey, GetBodyData, Body>(
  { method, route, alias, scenarios }: CypressMock<Scenario, GetBodyData, Body>,
  scenario: any
): Cypress.Chainable<null> {
  const response = isCypressMockResponse(scenario)
    ? scenario
    : scenarios[scenario];

  return alias
    ? cy.intercept(method, route, response).as(alias.replace("@", ""))
    : cy.intercept(method, route, response);
}

export default mockFn;
