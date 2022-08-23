// eslint-disable-next-line import/no-unresolved
import { Interception } from "cypress/types/net-stubbing";
import { isMock } from "../helpers";
import Mock from "../mock";
import { WaitOptions } from "../types";

const waitFn = <K extends keyof any, GetBodyArgs>(
  originalFn: Cypress.CommandOriginalFn<"wait">,
  prevSubject: any,
  aliasOrMock: string | Mock<K, GetBodyArgs>,
  options?: Partial<WaitOptions>
): Cypress.Chainable<Interception> => {
  if (isMock(aliasOrMock)) {
    // @ts-ignore: if alias is undefined I want the originalFn to throw an error.
    return originalFn(prevSubject, aliasOrMock.alias, options);
  }

  // @ts-ignore: once declared wait() in Cypress namespace the originalFn expects nothing but Mock<ScenarioName>.
  return originalFn(prevSubject, aliasOrMock, options);
};

export default waitFn;
