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

export interface CypressMockResponse<ResponseBody> {
  statusCode: number;
  body: ResponseBody;
  default?: boolean;
}

export interface CypressMockInlineResponse<ResponseBody, BodyData> {
  statusCode: number;
  body?: ResponseBody;
  data?: BodyData;
}

export const isCypressMockInlineResponse = <ResponseBody, BodyData>(
  b: unknown
): b is CypressMockInlineResponse<ResponseBody, BodyData> =>
  !!(b as CypressMockInlineResponse<ResponseBody, BodyData>).statusCode;
