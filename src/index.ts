/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { Interception } from "cypress/types/net-stubbing";
import Mock from "./mock";
import mockFn from "./commands/mock-fn";
import { MockBodyResponse, MockDataResponse, WaitOptions } from "./types";
import waitFn from "./commands/wait-fn";

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      // It's a dummy oveload that solves a problem of Intelisense
      // More: https://stackoverflow.com/a/72309674
      mock<K extends keyof any, GetBodyArgs>(
        mock: Mock<K, GetBodyArgs>,
        scenario: K | MockBodyResponse | MockDataResponse<GetBodyArgs>
      ): Chainable<null>;

      mock<K extends keyof any, GetBodyArgs>(
        mock: Mock<K, GetBodyArgs>,
        scenario: K
      ): Chainable<null>;

      mock<K extends keyof any, GetBodyArgs>(
        mock: Mock<K, GetBodyArgs>,
        scenario: MockBodyResponse
      ): Chainable<null>;

      mock<K extends keyof any, GetBodyArgs>(
        mock: Mock<K, GetBodyArgs>,
        scenario: MockDataResponse<GetBodyArgs>
      ): Chainable<null>;

      wait<K extends keyof any, GetBodyArgs>(
        mock: Mock<K, GetBodyArgs>,
        options?: Partial<WaitOptions>
      ): Chainable<Interception>;
    }
  }
}

Cypress.Commands.overwrite("wait", waitFn);

Cypress.Commands.add("mock", mockFn);

export { Mock };
