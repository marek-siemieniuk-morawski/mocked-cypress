/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import Mock, { MockProps } from "./mock";
import mockFn from "./mock-fn";
import { RecordKey, MockResponse } from "./types";

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      newMock<ScenarioName extends RecordKey, BodyData = undefined>(
        props: MockProps<ScenarioName, BodyData>
      ): Mock<ScenarioName, BodyData>;

      mock<ScenarioName extends RecordKey, BodyData = undefined>(
        mock: Mock<ScenarioName, BodyData>
      ): Cypress.Chainable<null>;

      mock<ScenarioName extends RecordKey, BodyData = undefined>(
        mock: Mock<ScenarioName, BodyData>,
        scenario: ScenarioName
      ): Chainable;

      mock<ScenarioName extends RecordKey, BodyData = undefined>(
        mock: Mock<ScenarioName, BodyData>,
        response: MockResponse<BodyData>
      ): Chainable;
    }
  }
}

Cypress.Commands.add("newMock", Mock.new);

Cypress.Commands.add("mock", mockFn);
