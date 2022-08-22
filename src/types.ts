// eslint-disable-next-line import/no-unresolved
import { StaticResponse } from "cypress/types/net-stubbing";

/**
 * Response that will be sent back to the browser to fulfil the request.
 * It includes all the Cypress' `StaticResponse` properties but `delayMs`, `fixture`
 * and `headers` as these are deprecated or defined in a `Mock` class.
 */
type MockResponse = Omit<StaticResponse, "delayMs" | "fixture" | "headers">;

/**
 * Static string/JSON object used as the response body. It's copied-pasted
 * from `cypress/types/net-stubbing` as it is being not exported there.
 */
export type ResponseBody = string | object | boolean | ArrayBuffer | null;

/**
 * Describes an object that is passed explicitly to `cy.mock()`. It's used
 * to stub a request as you defined it, without any modification on the way.
 */
export interface MockBodyResponse extends MockResponse {
  statusCode: number;
  body: ResponseBody;
}

/**
 * Describes an object that is passed explicitly to `cy.mock()`. It's used
 * to stub a request where `args` are used to call `getBody(args)` that
 * returns the final body object.
 */
export interface MockDataResponse<GetBodyArgs> extends MockResponse {
  statusCode: number;
  args: GetBodyArgs;
}

/**
 * Describes `cy.wait()` options object.
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
