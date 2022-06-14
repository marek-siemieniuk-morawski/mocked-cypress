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

export const isCypressMockResponse = <ResponseBody>(
  b: unknown
): b is CypressMockResponse<ResponseBody> =>
  (b as CypressMockResponse<ResponseBody>).statusCode !== undefined;
