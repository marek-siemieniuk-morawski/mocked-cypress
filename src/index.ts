/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { Interception } from "cypress/types/net-stubbing";
import CypressMock from "./cypress-mock";
import mockFn from "./commands/mock-fn";
import { RecordKey, MockResponse, WaitOptions } from "./types";
import waitFn from "./commands/wait-fn";

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

      wait<ScenarioName extends RecordKey>(
        alias: CypressMock<ScenarioName>,
        options?: Partial<WaitOptions>
      ): Chainable<Interception>;
    }
  }
}

Cypress.Commands.overwrite("wait", waitFn);

Cypress.Commands.add("mock", mockFn);

export { CypressMock };
