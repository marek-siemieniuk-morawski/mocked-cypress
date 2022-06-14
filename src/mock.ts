/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { RouteMatcher } from "cypress/types/net-stubbing";
import { RecordKey, MockResponse } from "./types";

type Method = "GET" | "POST" | "PATCH" | "DELETE" | "OPTIONS";

export interface MockProps<Scenario extends RecordKey, BodyData, Body> {
  route: RouteMatcher;
  method: Method;
  alias?: string;
  scenario: Record<Scenario, MockResponse<Body>>;
  getBody?: (data: BodyData) => Body;
}

class Mock<Scenario extends RecordKey, BodyData, Body> {
  public readonly method: Method;

  public readonly route: RouteMatcher;

  public readonly alias?: string;

  public readonly scenarios: Record<Scenario, MockResponse<Body>>;

  public readonly getBody?: (data: BodyData) => Body;

  // eslint-disable-next-line no-shadow
  static new<Scenario extends RecordKey, Body, BodyData>(
    props: MockProps<Scenario, Body, BodyData>
  ): Mock<Scenario, Body, BodyData> {
    const defaultScenarios = Mock.getDefaultScenarios(props.scenario);

    if (defaultScenarios.length > 1) {
      throw new Error(
        `Only one scenario can be a default one. Default scenarios: ${defaultScenarios}`
      );
    }

    return new Mock(props);
  }

  private static getDefaultScenarios<Body>(
    scenarios: Record<string, MockResponse<Body>>
  ): string[] {
    return Object.keys(scenarios).filter((name) => scenarios[name].default);
  }

  private constructor(props: MockProps<Scenario, BodyData, Body>) {
    this.method = props.method;
    this.route = props.route;
    this.alias = props.alias;
    this.scenarios = props.scenario;
    this.getBody = props.getBody;
  }
}

export default Mock;
