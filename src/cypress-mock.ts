/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { RouteMatcher } from "cypress/types/net-stubbing";
import { MockResponse } from "./types";

type Method = "GET" | "POST" | "PATCH" | "DELETE" | "OPTIONS";

type ResponseBody = string | object | boolean | ArrayBuffer | null;

interface Properties<Scenario extends keyof any, GetBodyFnProps> {
  route: RouteMatcher;
  method: Method;
  alias?: string;
  scenarios: Record<Scenario, MockResponse>;
  getBodyFn?: (props: GetBodyFnProps) => ResponseBody;
}

class CypressMock<Scenario extends keyof any, GetBodyFnProps> {
  public readonly method: Method;

  public readonly route: RouteMatcher;

  public readonly alias?: string;

  public readonly scenarios: Record<Scenario, MockResponse>;

  public readonly getBodyFn?: (props: GetBodyFnProps) => ResponseBody;

  static new<Scenario extends keyof any, GetBodyFnProps>(
    props: Properties<Scenario, GetBodyFnProps>
  ): CypressMock<Scenario, GetBodyFnProps> {
    return new CypressMock({
      ...props,
      alias: CypressMock.addAtSignToAlias(props.alias),
    });
  }

  private static addAtSignToAlias(alias?: string): string | undefined {
    if (alias === undefined) {
      return alias;
    }

    return alias.startsWith("@") ? alias : `@${alias}`;
  }

  private constructor(props: Properties<Scenario, GetBodyFnProps>) {
    this.method = props.method;
    this.route = props.route;
    this.alias = props.alias;
    this.scenarios = props.scenarios;
    this.getBodyFn = props.getBodyFn;
  }
}

export default CypressMock;
