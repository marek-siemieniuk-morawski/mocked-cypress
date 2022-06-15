/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import Mock from "./mock";
import {
  RecordKey,
  isMockResponse,
  BaseMockResponse,
  MockResponse,
} from "./types";

const getDefaultScenario = <ScenarioName extends RecordKey, Body, BodyData>(
  mock: Mock<ScenarioName, Body, BodyData>
): BaseMockResponse<Body> => {
  if (mock.defaultScenario === undefined) {
    throw new Error("");
  }

  return {
    statusCode: mock.defaultScenario.statusCode,
    body: mock.defaultScenario.body,
  };
};

const resolveFoo = <ScenarioName extends RecordKey, Body, BodyData>(
  { scenario, getBody }: Mock<ScenarioName, Body, BodyData>,
  foo: any
): BaseMockResponse<Body> => {
  if (isMockResponse<Body, BodyData>(foo)) {
    const { statusCode, body, data } = foo;

    return {
      statusCode,
      body: data !== undefined && getBody !== undefined ? getBody(data) : body,
    };
  }

  return scenario[foo];
};

const getResponse = <ScenarioName extends RecordKey, Body, BodyData>(
  mock: Mock<ScenarioName, Body, BodyData>,
  foo: any
): BaseMockResponse<Body> => {
  if (foo === undefined) {
    return getDefaultScenario(mock);
  }

  return resolveFoo(mock, foo);
};

function mockFn<ScenarioName extends RecordKey, BodyData, Body>(
  mock: Mock<ScenarioName, BodyData, Body>
): Cypress.Chainable<null>;

function mockFn<ScenarioName extends RecordKey, BodyData, Body>(
  mock: Mock<ScenarioName, BodyData, Body>,
  scenario: ScenarioName
): Cypress.Chainable<null>;

function mockFn<Scenario extends RecordKey, BodyData, Body>(
  mock: Mock<Scenario, BodyData, Body>,
  response: MockResponse<Body, BodyData>
): Cypress.Chainable<null>;

function mockFn<ScenarioName extends RecordKey, BodyData, Body>(
  mock: Mock<ScenarioName, BodyData, Body>,
  foo?: any
): Cypress.Chainable<null> {
  const { method, route, alias } = mock;
  const response = getResponse(mock, foo);

  return alias
    ? cy.intercept(method, route, response).as(alias.replace("@", ""))
    : cy.intercept(method, route, response);
}

export default mockFn;
