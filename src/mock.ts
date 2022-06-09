import { StaticResponse, RouteMatcher } from "cypress/types/net-stubbing";

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

interface StaticMockResponse extends StaticResponse {
  default?: boolean;
}

type Method = "GET";

export interface CypressMockProps<Scenario extends RecordKey> {
  route: RouteMatcher;
  method: Method;
  alias?: string;
  scenarios: Record<Scenario, StaticMockResponse>;
  getBody?: Function;
}

class CypressMock<Scenario extends RecordKey> {
  public readonly method: Method;

  public readonly route: RouteMatcher;

  public readonly alias?: string;

  public readonly scenarios: Record<Scenario, StaticMockResponse>;

  public readonly getBody?: Function;

  // eslint-disable-next-line no-shadow
  static new<Scenario extends RecordKey>(
    props: CypressMockProps<Scenario>
  ): CypressMock<Scenario> {
    if (!CypressMock.isOnlyOneScenarioDefault(props.scenarios)) {
      throw new Error("");
    }

    return new CypressMock(props);
  }

  private static isOnlyOneScenarioDefault(
    scenarios: Record<string, StaticMockResponse>
  ): boolean {
    return (
      Object.keys(scenarios).map((name) => scenarios[name].default).length > 1
    );
  }

  private constructor(props: CypressMockProps<Scenario>) {
    this.method = props.method;
    this.route = props.route;
    this.alias = props.alias;
    this.scenarios = props.scenarios;
    this.getBody = props.getBody;
  }
}

export default CypressMock;
