/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { RouteMatcher } from "cypress/types/net-stubbing";
import { RecordKey, CypressMockResponse } from "./types";

type Method = "GET" | "POST" | "PATCH" | "DELETE" | "OPTIONS";

export interface CypressMockProps<
  Scenario extends RecordKey,
  GetBodyData,
  Body
> {
  route: RouteMatcher;
  method: Method;
  alias?: string;
  scenarios: Record<Scenario, CypressMockResponse<Body>>;
  getBody?: (data: GetBodyData) => Body;
}

class CypressMock<Scenario extends RecordKey, GetBodyData, Body> {
  public readonly method: Method;

  public readonly route: RouteMatcher;

  public readonly alias?: string;

  public readonly scenarios: Record<Scenario, CypressMockResponse<Body>>;

  public readonly getBody?: (data: GetBodyData) => Body;

  // eslint-disable-next-line no-shadow
  static new<Scenario extends RecordKey, Body, BodyData>(
    props: CypressMockProps<Scenario, Body, BodyData>
  ): CypressMock<Scenario, Body, BodyData> {
    const defaultScenarios = CypressMock.getDefaultScenarios(props.scenarios);

    if (defaultScenarios.length > 1) {
      throw new Error(
        `Only one scenario can be a default one. Default scenarios: ${defaultScenarios}`
      );
    }

    return new CypressMock(props);
  }

  private static getDefaultScenarios<Body>(
    scenarios: Record<string, CypressMockResponse<Body>>
  ): string[] {
    return Object.keys(scenarios).filter((name) => scenarios[name].default);
  }

  private constructor(props: CypressMockProps<Scenario, GetBodyData, Body>) {
    this.method = props.method;
    this.route = props.route;
    this.alias = props.alias;
    this.scenarios = props.scenarios;
    this.getBody = props.getBody;
  }
}

export default CypressMock;
