import Mock from "./mock";
import { MockBodyResponse, MockDataResponse } from "./types";

export const isMockBodyResponse = (b: unknown): b is MockBodyResponse =>
  (b as MockBodyResponse).body !== undefined;

export const isMockDataResponse = <GetBodyArgs>(
  b: unknown
): b is MockDataResponse<GetBodyArgs> =>
  (b as MockDataResponse<GetBodyArgs>).data !== undefined;

export const isMock = <Scenario extends keyof any, GetBodyArgs>(
  b: unknown
): b is Mock<Scenario, GetBodyArgs> =>
  (b as Mock<Scenario, GetBodyArgs>).scenario !== undefined;
