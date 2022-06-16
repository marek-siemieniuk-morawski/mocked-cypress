/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import Mock, { MockProps } from "./mock";
import mockFn from "./mock-fn";
import { RecordKey, MockResponse } from "./types";

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      newMock<ScenarioName extends RecordKey, Body, BodyData = undefined>(
        props: MockProps<ScenarioName, Body, BodyData>
      ): Mock<ScenarioName, Body, BodyData>;

      mock<ScenarioName extends RecordKey, Body, BodyData = undefined>(
        mock: Mock<ScenarioName, Body, BodyData>
      ): Cypress.Chainable<null>;

      mock<ScenarioName extends RecordKey, Body, BodyData = undefined>(
        mock: Mock<ScenarioName, Body, BodyData>,
        scenario: ScenarioName
      ): Chainable;

      mock<ScenarioName extends RecordKey, Body, BodyData = undefined>(
        mock: Mock<ScenarioName, Body, BodyData>,
        response: MockResponse<Body, BodyData>
      ): Chainable;
    }
  }
}

Cypress.Commands.add("newMock", Mock.new);

Cypress.Commands.add("mock", mockFn);
