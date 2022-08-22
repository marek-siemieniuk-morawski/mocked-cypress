/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-unresolved
import { RouteMatcher } from "cypress/types/net-stubbing";
import { MockBodyResponse, ResponseBody } from "./types";

/**
 * HTTP request methods.
 */
type Method =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

/**
 * Required properties to initialise a Mock class instance.
 */
interface Properties<K extends keyof any, GetBodyArgs = undefined> {
  route: RouteMatcher;
  method: Method;
  alias?: string;
  scenario: Record<K, MockBodyResponse>;
  getBody?: (...args: GetBodyArgs[]) => ResponseBody;
}

/**
 * A class that includes all the endpoint properties needed to
 * intercept an HTTP request. It's used by `cy.mock()` and it's
 * basically the heart of the package.
 */
class Mock<K extends keyof any, GetBodyArgs> {
  /**
   * Creates a new instance of Mock class. It's needed to create it
   * this way, not directly, to not be forced to declare generic
   * types in upfront.
   *
   * @example
   * ```
   *  const getToken = Mock.new({
   *    route: "https://localhost:7777/authService/token",
   *    method: "POST",
   *    scenario: {
   *      authenticated: {
   *        statusCode: 200,
   *        body: { token: "JWT_TOKEN", role: "USER" },
   *      },
   *    },
   *  });
   *
   * ```
   */
  static new<K extends keyof any, GetBodyArgs = undefined>(
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
   * HTTP request method of the mock endpoint.
   */
  method: Method;

  /**
   * `RouteMatcher` of the mock endpoint.
   */
  route: RouteMatcher;

  /**
   * Alias of the mock endpoint that is used by `cy.wait()` if defined.
   */
  alias?: string;

  /**
   * A method that is called to get a mock response body object when
   * `cy.mock()` is being called with `{ data: any }`.
   */
  getBody?: (...args: GetBodyArgs[]) => ResponseBody;

  /**
   * Collection of predefined scenarios that are used by `cy.mock()`
   * when it's called with a scenario name.
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
