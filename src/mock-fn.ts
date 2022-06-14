/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import CypressMock from "./cypress-mock";
import {
  RecordKey,
  isCypressMockInlineResponse,
  CypressMockResponse,
  CypressMockInlineResponse,
} from "./types";

function mockFn<Scenario extends RecordKey, BodyData, Body>(
  mock: CypressMock<Scenario, BodyData, Body>,
  scenario: Scenario
): Cypress.Chainable<null>;

function mockFn<Scenario extends RecordKey, BodyData, Body>(
  mock: CypressMock<Scenario, BodyData, Body>,
  scenario: Omit<CypressMockInlineResponse<Body, BodyData>, "default">
): Cypress.Chainable<null>;

function mockFn<Scenario extends RecordKey, BodyData, Body>(
  mock: CypressMock<Scenario, BodyData, Body>,
  scenario: any
): Cypress.Chainable<null> {
  const { method, route, alias, getBody, scenarios } = mock;

  const response: CypressMockResponse<Body> = isCypressMockInlineResponse(
    scenario
  )
    ? scenario
    : scenarios[scenario];

  return alias
    ? cy.intercept(method, route, response).as(alias.replace("@", ""))
    : cy.intercept(method, route, response);
}

export default mockFn;
