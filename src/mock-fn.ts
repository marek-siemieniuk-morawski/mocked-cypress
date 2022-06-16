/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import Mock from "./mock";
import {
  RecordKey,
  isMockResponse,
  BaseMockResponse,
  MockResponse,
} from "./types";

const getDefaultScenario = <
  ScenarioName extends RecordKey,
  BodyData = undefined
>(
  mock: Mock<ScenarioName, BodyData>
): BaseMockResponse => {
  if (mock.defaultScenario === undefined) {
    throw new Error("");
  }

  return {
    statusCode: mock.defaultScenario.statusCode,
    body: mock.defaultScenario.body,
  };
};

const resolveFoo = <ScenarioName extends RecordKey, BodyData = undefined>(
  { scenario, getBody }: Mock<ScenarioName, BodyData>,
  scenarioOrResponse: any
): BaseMockResponse => {
  if (isMockResponse<BodyData>(scenarioOrResponse)) {
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

const getResponse = <ScenarioName extends RecordKey, BodyData = undefined>(
  mock: Mock<ScenarioName, BodyData>,
  scenarioOrResponse: any
): BaseMockResponse => {
  if (scenarioOrResponse === undefined) {
    return getDefaultScenario(mock);
  }

  return resolveFoo(mock, scenarioOrResponse);
};

function mockFn<ScenarioName extends RecordKey, BodyData>(
  mock: Mock<ScenarioName, BodyData>
): Cypress.Chainable<null>;

function mockFn<ScenarioName extends RecordKey, BodyData>(
  mock: Mock<ScenarioName, BodyData>,
  scenario: ScenarioName
): Cypress.Chainable<null>;

function mockFn<Scenario extends RecordKey, BodyData>(
  mock: Mock<Scenario, BodyData>,
  response: MockResponse<BodyData>
): Cypress.Chainable<null>;

function mockFn<ScenarioName extends RecordKey, BodyData>(
  mock: Mock<ScenarioName, BodyData>,
  scenarioOrResponse?: any
): Cypress.Chainable<null> {
  const { method, route, alias } = mock;
  const response = getResponse(mock, scenarioOrResponse);

  return alias
    ? cy.intercept(method, route, response).as(alias.replace("@", ""))
    : cy.intercept(method, route, response);
}

export default mockFn;
