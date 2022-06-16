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

export interface BaseMockResponse<Body> {
  statusCode: number;
  body?: Body;
}

export interface Scenario<Body> extends BaseMockResponse<Body> {
  statusCode: number;
  body: Body;
  default?: boolean;
}

export interface MockResponse<Body, BodyData = undefined>
  extends BaseMockResponse<Body> {
  data?: BodyData;
}

export const isMockResponse = <Body, BodyData = undefined>(
  b: unknown
): b is MockResponse<Body, BodyData> =>
  (b as MockResponse<Body, BodyData>).statusCode !== undefined;
