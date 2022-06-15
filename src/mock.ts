/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { RouteMatcher } from "cypress/types/net-stubbing";
import { RecordKey, Scenario } from "./types";

type Method = "GET" | "POST" | "PATCH" | "DELETE" | "OPTIONS";

export interface MockProps<ScenarioName extends RecordKey, Body, BodyData> {
  route: RouteMatcher;
  method: Method;
  alias?: string;
  scenario: Record<ScenarioName, Scenario<Body>>;
  getBody?: (data: BodyData) => Body;
}

class Mock<ScenarioName extends RecordKey, Body, BodyData> {
  public readonly method: Method;

  public readonly route: RouteMatcher;

  public readonly alias?: string;

  public readonly scenario: Record<ScenarioName, Scenario<Body>>;

  public readonly getBody?: (data: BodyData) => Body;

  public readonly defaultScenario?: Scenario<Body>;

  // eslint-disable-next-line no-shadow
  static new<ScenarioName extends RecordKey, Body, BodyData>(
    props: MockProps<ScenarioName, Body, BodyData>
  ): Mock<ScenarioName, Body, BodyData> {
    const defaultScenario = Mock.getDefaultScenario(props.scenario);

    return new Mock(props, defaultScenario);
  }

  private static getDefaultScenario<ScenarioName extends RecordKey, Body>(
    scenario: Record<ScenarioName, Scenario<Body>>
  ): Scenario<Body> {
    const keys = Object.keys(scenario).filter((name) => scenario[name].default);

    if (keys.length > 1) {
      throw new Error(
        `Only one scenario can be a default one. Default scenarios: ${keys}`
      );
    }

    return scenario[keys[0]];
  }

  private constructor(
    props: MockProps<ScenarioName, Body, BodyData>,
    defaultScenario?: Scenario<Body>
  ) {
    this.method = props.method;
    this.route = props.route;
    this.alias = props.alias;
    this.scenario = props.scenario;
    this.getBody = props.getBody;
    this.defaultScenario = defaultScenario;
  }
}

export default Mock;
