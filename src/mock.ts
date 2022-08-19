/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { RouteMatcher } from "cypress/types/net-stubbing";
import { MockBodyResponse } from "./types";

/**
 *
 */
type Method = "GET" | "POST" | "PATCH" | "DELETE" | "OPTIONS";

/**
 *
 */
type ResponseBody = string | object | boolean | ArrayBuffer | null;

/**
 *
 */
interface Properties<K extends keyof any, GetBodyArgs> {
  route: RouteMatcher;
  method: Method;
  alias?: string;
  scenario: Record<K, MockBodyResponse>;
  getBody?: (...args: GetBodyArgs[]) => ResponseBody;
}

/**
 *
 */
class Mock<K extends keyof any, GetBodyArgs> {
  /**
   *
   */
  static new<K extends keyof any, GetBodyArgs>(
    props: Properties<K, GetBodyArgs>
  ): Mock<K, GetBodyArgs> {
    const addAtSignToAlias = (alias?: string): string | undefined => {
      if (alias === undefined) {
        return alias;
      }

      return alias.startsWith("@") ? alias : `@${alias}`;
    };

    return new Mock<K, GetBodyArgs>({
      ...props,
      alias: addAtSignToAlias(props.alias),
    });
  }

  /**
   *
   */
  method: Method;

  /**
   *
   */
  route: RouteMatcher;

  /**
   *
   */
  alias?: string;

  /**
   *
   */
  getBody?: (...args: GetBodyArgs[]) => ResponseBody;

  /**
   *
   */
  scenario: Record<K, MockBodyResponse>;

  private constructor(props: Properties<K, GetBodyArgs>) {
    this.method = props.method;
    this.route = props.route;
    this.alias = props.alias;
    this.getBody = props.getBody;
    this.scenario = props.scenario;
  }
}

export default Mock;
