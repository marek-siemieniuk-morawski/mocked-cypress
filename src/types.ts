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

export const isMockResponse = <BodyData = undefined>(
  b: unknown
): b is MockResponse<BodyData> =>
  (b as MockResponse<BodyData>).statusCode !== undefined;
