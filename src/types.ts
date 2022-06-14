/**
 * An alias on `keyof any` to have all references in a single place.
 * It must be `any` here to satify `Record` type:
 * ```
 * type Record<K extends keyof any, T> = {
 *   [P in K]: T;
 * };
 * ```
 */
export type RecordKey = keyof any;

export interface MockResponse<ResponseBody> {
  statusCode: number;
  body: ResponseBody;
  default?: boolean;
}

export interface MockResponseInline<ResponseBody, BodyData> {
  statusCode: number;
  body?: ResponseBody;
  data?: BodyData;
}

export const isMockResponseInline = <ResponseBody, BodyData>(
  b: unknown
): b is MockResponseInline<ResponseBody, BodyData> =>
(b as MockResponseInline<ResponseBody, BodyData>).statusCode !== undefined;
