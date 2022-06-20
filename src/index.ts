/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import CypressMock from "./cypress-mock";
import mockFn from "./mock-fn";
import { RecordKey, MockResponse } from "./types";

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      mock<ScenarioName extends RecordKey, BodyData = undefined>(
        mock: CypressMock<ScenarioName, BodyData>
      ): Cypress.Chainable<null>;

      mock<ScenarioName extends RecordKey, BodyData = undefined>(
        mock: CypressMock<ScenarioName, BodyData>,
        scenario: ScenarioName
      ): Chainable;

      mock<ScenarioName extends RecordKey, BodyData = undefined>(
        mock: CypressMock<ScenarioName, BodyData>,
        response: MockResponse<BodyData>
      ): Chainable;
    }
  }
}

Cypress.Commands.add("mock", mockFn);

export { CypressMock };
