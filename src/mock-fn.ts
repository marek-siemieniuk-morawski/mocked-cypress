/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import CypressMock from "./cypress-mock";
import { RecordKey, isCypressMockResponse, CypressMockResponse } from "./types";

function mockFn<Scenario extends RecordKey, BodyData, Body>(
  mock: CypressMock<Scenario, BodyData, Body>,
  scenario: Scenario
): Cypress.Chainable<null>;

function mockFn<Scenario extends RecordKey, BodyData, Body>(
  mock: CypressMock<Scenario, BodyData, Body>,
  scenario: Omit<CypressMockResponse<Body>, "default">
): Cypress.Chainable<null>;

function mockFn<Scenario extends RecordKey, BodyData, Body>(
  mock: CypressMock<Scenario, BodyData, Body>,
  scenario: Scenario,
  override: CypressMockResponse<Body>
): Cypress.Chainable<null>;

function mockFn<Scenario extends RecordKey, BodyData, Body>(
  { method, route, alias, scenarios }: CypressMock<Scenario, BodyData, Body>,
  scenario: any,
  override?: CypressMockResponse<Body>
): Cypress.Chainable<null> {
  const response = isCypressMockResponse(scenario)
    ? Object.assign(scenario, override)
    : scenarios[scenario];

  return alias
    ? cy.intercept(method, route, response).as(alias.replace("@", ""))
    : cy.intercept(method, route, response);
}

export default mockFn;
