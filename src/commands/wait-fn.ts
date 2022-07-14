import CypressMock from "../cypress-mock";
import { isCypressMock } from "../helpers";
import { WaitOptions } from "../types";

const waitFn = <Scenario extends keyof any, GetBodyFnProps>(
  originalFn: Cypress.CommandOriginalFn<"wait">,
  aliasOrCypressMock: string | CypressMock<Scenario, GetBodyFnProps>,
  options?: Partial<WaitOptions>
) => {
  if (isCypressMock(aliasOrCypressMock)) {
    // @ts-ignore: if alias is undefined I want the originalFn to throw an error.
    return originalFn(aliasOrCypressMock.alias, options);
  }

  // @ts-ignore: once declared wait() in Cypress namespace the originalFn expects nothing but CypressMock<ScenarioName>.
  return originalFn(aliasOrCypressMock, options);
};

export default waitFn;
