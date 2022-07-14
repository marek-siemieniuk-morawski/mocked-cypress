/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { Interception } from "cypress/types/net-stubbing";
import CypressMock from "./cypress-mock";
import mockFn from "./commands/mock-fn";
import { ExplicitScenario, WaitOptions } from "./types";
import waitFn from "./commands/wait-fn";

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      mock<Scenario extends keyof any, GetBodyFnProps>(
        mock: CypressMock<Scenario, GetBodyFnProps>,
        scenario: Scenario
      ): Chainable;

      mock<Scenario extends keyof any, GetBodyFnProps>(
        mock: CypressMock<Scenario, GetBodyFnProps>,
        response: ExplicitScenario<GetBodyFnProps>
      ): Chainable;

      wait<Scenario extends keyof any, GetBodyFnProps>(
        alias: CypressMock<Scenario, GetBodyFnProps>,
        options?: Partial<WaitOptions>
      ): Chainable<Interception>;
    }
  }
}

Cypress.Commands.overwrite("wait", waitFn);

Cypress.Commands.add("mock", mockFn);

export { CypressMock };
