/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-unresolved
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

      /**
       * Use cy.mock() to stub and intercept HTTP requests and responses
       * by passing a scenario name to stub the endpoint with a scenario
       * you defined while initialising the Mock instance.
       *
       * @example
       * ```
       *  cy.mock(getUsers, "empty list");
       * ```
       *
       * @example
       * ```
       *  cy.mock(authService.getToken, "authenticated");
       * ```
       */
      mock<K extends keyof any, GetBodyArgs>(
        mock: Mock<K, GetBodyArgs>,
        scenario: K
      ): Chainable<null>;

      /**
       * Use cy.mock() to stub and intercept HTTP requests and responses
       * by passing status code and body object to stub the endpoint with
       * the properties you just defined.
       *
       * @example
       * ```
       *  cy.mock(getUsers, { statusCode: 200, body: { users: [] } });
       * ```
       *
       * @example
       * ```
       *  cy.mock(authService.getToken, { statusCode: 200, body: { token: 'JWT_TOKEN', role: 'USER' } });
       * ```
       */
      mock<K extends keyof any, GetBodyArgs>(
        mock: Mock<K, GetBodyArgs>,
        scenario: MockBodyResponse
      ): Chainable<null>;

      /**
       * Use cy.mock() to stub and intercept HTTP requests and responses
       * by passing status code and data object to stub the endpoint with
       * an output of getBody() function you defined while initialising
       * the Mock instance.
       *
       * @example
       * ```
       *  cy.mock(getUsers, { statusCode: 200, data: [] });
       * ```
       *
       * @example
       * ```
       *  cy.mock(authService.getToken, { statusCode: 200, data: { userType: 'USER' } });
       * ```
       */
      mock<K extends keyof any, GetBodyArgs>(
        mock: Mock<K, GetBodyArgs>,
        scenario: MockDataResponse<GetBodyArgs>
      ): Chainable<null>;

      /**
       * Custom overload of `cy.wait()` function.
       *
       * Wait for a request aliased in a Mock instance to complete.
       *
       * @example
       * ```
       * // Wait for the route aliased as is is defined within the Mock class instance
       * // If it is not defined but cy.wait() is called anyway, it throws an error.
       * cy.wait(getUsers);
       * ```
       *
       * @example
       * ```
       * // Wait for the route aliased as is is defined within the Mock class instance
       * cy.wait(authService.getToken).then((interception) => {
       * // As in regular usage of cy.wait(),
       * // we can now access the low level request
       * // that contains the request body,
       * // response body, status, etc
       * })
       * ```
       */
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
