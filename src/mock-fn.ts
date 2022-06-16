/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import Mock from "./mock";
import {
  RecordKey,
  isMockResponse,
  BaseMockResponse,
  MockResponse,
} from "./types";

const getDefaultScenario = <ScenarioName extends RecordKey, Body, BodyData = undefined>(
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

const resolveFoo = <ScenarioName extends RecordKey, Body, BodyData = undefined>(
  { scenario, getBody }: Mock<ScenarioName, Body, BodyData>,
  scenarioOrResponse: any
): BaseMockResponse<Body> => {
  if (isMockResponse<Body, BodyData>(scenarioOrResponse)) {
    const { statusCode, body, data } = scenarioOrResponse;

    if (data !== undefined && getBody === undefined) {
      throw Error("");
    }

    return {
      statusCode,
      // TODO: Do it without !
      body: data === undefined ? body : getBody!(data),
    };
  }

  return scenario[scenarioOrResponse];
};

const getResponse = <ScenarioName extends RecordKey, Body, BodyData = undefined>(
  mock: Mock<ScenarioName, Body, BodyData>,
  scenarioOrResponse: any
): BaseMockResponse<Body> => {
  if (scenarioOrResponse === undefined) {
    return getDefaultScenario(mock);
  }

  return resolveFoo(mock, scenarioOrResponse);
};

function mockFn<ScenarioName extends RecordKey, Body, BodyData>(
  mock: Mock<ScenarioName, BodyData, Body>
): Cypress.Chainable<null>;

function mockFn<ScenarioName extends RecordKey, Body, BodyData>(
  mock: Mock<ScenarioName, BodyData, Body>,
  scenario: ScenarioName
): Cypress.Chainable<null>;

function mockFn<Scenario extends RecordKey, Body, BodyData>(
  mock: Mock<Scenario, Body, BodyData>,
  response: MockResponse<Body, BodyData>
): Cypress.Chainable<null>;

function mockFn<ScenarioName extends RecordKey, Body, BodyData>(
  mock: Mock<ScenarioName, Body, BodyData>,
  scenarioOrResponse?: any
): Cypress.Chainable<null> {
  const { method, route, alias } = mock;
  const response = getResponse(mock, scenarioOrResponse);

  return alias
    ? cy.intercept(method, route, response).as(alias.replace("@", ""))
    : cy.intercept(method, route, response);
}

export default mockFn;
