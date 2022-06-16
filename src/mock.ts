/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { RouteMatcher } from "cypress/types/net-stubbing";
import { RecordKey, Scenario } from "./types";

type Method = "GET" | "POST" | "PATCH" | "DELETE" | "OPTIONS";

export interface MockProps<
  ScenarioName extends RecordKey,
  BodyData = undefined
> {
  route: RouteMatcher;
  method: Method;
  alias?: string;
  scenario: Record<ScenarioName, Scenario>;
  getBody?: (data: BodyData) => unknown;
}

class Mock<ScenarioName extends RecordKey, BodyData = undefined> {
  public readonly method: Method;

  public readonly route: RouteMatcher;

  public readonly alias?: string;

  public readonly scenario: Record<ScenarioName, Scenario>;

  public readonly getBody?: (data: BodyData) => unknown;

  public readonly defaultScenario?: Scenario;

  // eslint-disable-next-line no-shadow
  static new<ScenarioName extends RecordKey, BodyData = undefined>(
    props: MockProps<ScenarioName, BodyData>
  ): Mock<ScenarioName, BodyData> {
    const defaultScenario = Mock.getDefaultScenario(props.scenario);

    return new Mock(props, defaultScenario);
  }

  private static getDefaultScenario<ScenarioName extends RecordKey>(
    scenario: Record<ScenarioName, Scenario>
  ): Scenario {
    const keys = Object.keys(scenario).filter((name) => scenario[name].default);

    if (keys.length > 1) {
      throw new Error(
        `Only one scenario can be a default one. Default scenarios: ${keys}`
      );
    }

    return scenario[keys[0]];
  }

  private constructor(
    props: MockProps<ScenarioName, BodyData>,
    defaultScenario?: Scenario
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
