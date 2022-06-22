import CypressMock from "./cypress-mock";
import { RecordKey, MockResponse } from "./types";

export const isCypressMock = <ScenarioName extends RecordKey>(
  b: unknown
): b is CypressMock<ScenarioName> =>
  (b as CypressMock<ScenarioName>).scenario !== undefined;

export const isMockResponse = <BodyData = undefined>(
  b: unknown
): b is MockResponse<BodyData> =>
  (b as MockResponse<BodyData>).statusCode !== undefined;
