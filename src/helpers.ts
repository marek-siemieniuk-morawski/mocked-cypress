import CypressMock from "./cypress-mock";
import { ExplicitScenario } from "./types";

export const isCypressMock = <Scenario extends keyof any, GetBodyFnProps>(
  b: unknown
): b is CypressMock<Scenario, GetBodyFnProps> =>
  (b as CypressMock<Scenario, GetBodyFnProps>).scenarios !== undefined;

export const isExplicitScenario = <BodyData>(
  b: unknown
): b is ExplicitScenario<BodyData> =>
  (b as ExplicitScenario<BodyData>).statusCode !== undefined;
