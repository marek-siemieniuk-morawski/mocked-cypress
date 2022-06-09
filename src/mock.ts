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

interface MockProperties<
  Scenario extends RecordKey,
  GetBodyFn extends Function
> {
  route: RouteMatcher;
  method: Method;
  alias?: string;
  scenarios: Record<Scenario, StaticMockResponse>;
  getBodyFn?: GetBodyFn;
}

class Mock<Scenario extends RecordKey, GetBodyFn extends Function> {
  public readonly method: Method;

  public readonly route: RouteMatcher;

  public readonly alias?: string;

  public readonly scenarios: Record<Scenario, StaticMockResponse>;

  public readonly getBodyFn?: GetBodyFn;

  // eslint-disable-next-line no-shadow
  static create<Scenario extends RecordKey, GetBodyFn extends Function>(
    props: MockProperties<Scenario, GetBodyFn>
  ): Mock<Scenario, GetBodyFn> {
    if (!Mock.isOnlyOneScenarioDefault(props.scenarios)) {
      throw new Error("");
    }

    return new Mock(props);
  }

  private static isOnlyOneScenarioDefault(
    scenarios: Record<string, StaticMockResponse>
  ): boolean {
    return (
      Object.keys(scenarios).map((name) => scenarios[name].default).length > 1
    );
  }

  private constructor(props: MockProperties<Scenario, GetBodyFn>) {
    this.method = props.method;
    this.route = props.route;
    this.alias = props.alias;
    this.scenarios = props.scenarios;
    this.getBodyFn = props.getBodyFn;
  }
}

export default Mock;
