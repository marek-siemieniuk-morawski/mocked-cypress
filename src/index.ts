import Mock, { RecordKey } from "./mock";

declare global {
    namespace Cypress {
      interface Chainable {
        mock<Scenario extends RecordKey, GetBodyFn extends Function>(
          mock: Mock<Scenario, GetBodyFn>
        ): Chainable;
      }
    }
  }

  
Cypress.Commands.add('mock', <Scenario extends RecordKey, GetBodyFn extends Function>(mock: Mock<Scenario, GetBodyFn>) => {
    return ()
});

cy.mock(getAccessToken).with('success');

cy.intercept