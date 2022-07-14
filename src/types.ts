import { StaticResponse } from "cypress/types/net-stubbing";

/**
 * Describes a response that will be sent back to the browser to fulfill the request.
 */
export type MockResponse = Omit<
  StaticResponse,
  "delayMs" | "fixture" | "headers"
>;

/**
 * An object that is passed explicitly when calling cy.mock().
 */
export interface ExplicitScenario<GetBodyFnProps> extends MockResponse {
  props?: GetBodyFnProps;
}

/**
 * Copied-pasted from 'cypress/types/net-stubbing' as it is being not exported there.
 */
export interface WaitOptions {
  /**
   * Displays the command in the Command Log
   *
   * @default true
   */
  log: boolean;
  /**
   * Time to wait for the request (ms)
   *
   * @default {@link Timeoutable#timeout}
   * @see https://on.cypress.io/configuration#Timeouts
   */
  requestTimeout: number;
  /**
   * Time to wait for the response (ms)
   *
   * @default {@link Timeoutable#timeout}
   * @see https://on.cypress.io/configuration#Timeouts
   */
  responseTimeout: number;
  /**
   * Time to wait (ms)
   *
   * @default defaultCommandTimeout
   * @see https://on.cypress.io/configuration#Timeouts
   */
  timeout: number;
}
