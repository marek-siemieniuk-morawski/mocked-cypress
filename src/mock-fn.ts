/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import Mock from "./mock";
import {
  RecordKey,
  isMockResponseInline,
  MockResponse,
  MockResponseInline,
} from "./types";

function mockFn<Scenario extends RecordKey, BodyData, Body>(
  mock: Mock<Scenario, BodyData, Body>,
  scenario: Scenario
): Cypress.Chainable<null>;

function mockFn<Scenario extends RecordKey, BodyData, Body>(
  mock: Mock<Scenario, BodyData, Body>,
  scenario: Omit<MockResponseInline<Body, BodyData>, "default">
): Cypress.Chainable<null>;

function mockFn<Scenario extends RecordKey, BodyData, Body>(
  mock: Mock<Scenario, BodyData, Body>,
  scenario: any
): Cypress.Chainable<null> {
  const { method, route, alias, getBody, scenarios } = mock;

  const response: MockResponse<Body> = isMockResponseInline(
    scenario
  )
    ? scenario
    : scenarios[scenario];

  return alias
    ? cy.intercept(method, route, response).as(alias.replace("@", ""))
    : cy.intercept(method, route, response);
}

export default mockFn;
