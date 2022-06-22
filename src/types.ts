/**
 * An alias on `keyof any` to have all references in a single place.
 * It must be `any` here to satify `Record` type:
 * ```
 * type Record<K extends keyof any, T> = {
 *   [P in K]: T;
 * };
 * ```
 */
export type RecordKey = string;

export interface BaseMockResponse {
  statusCode: number;
  body?: unknown;
}

export interface Scenario extends BaseMockResponse {
  statusCode: number;
  body: unknown;
  default?: boolean;
}

export interface MockResponse<BodyData = undefined> extends BaseMockResponse {
  data?: BodyData;
}

// Copied from 'cypress/types/net-stubbing' as it is not exported there
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
