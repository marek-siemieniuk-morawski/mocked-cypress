/* eslint-disable no-unused-vars */
import CypressMock, { RecordKey } from "./mock";

const fooMock = CypressMock.create({
    method: 'GET',
    route: '',
    getBody: ({ bar }: { bar: string }) => ({}),
    scenarios: {
        success: {
            statusCode: 200,
            body: {

            }
        }
    }
});

declare global {
  namespace Cypress {
    interface Chainable {
        newMock<Scenario extends RecordKey>(
            props: MockProperties<Scenario>
          ): CypressMock<Scenario> {
    
            
          }

      mock<Scenario extends RecordKey>(
        mock: CypressMock<Scenario>,
        scenario: Scenario
      ): Chainable;
    }
  }
}

Cypress.Commands.add(
  "mock",
  <Scenario extends RecordKey>(
    mock: CypressMock<Scenario>,
    scenario: Scenario
  ) => {
    const foo = "";

    return cy.intercept(foo);
  }
);

cy.mock(fooMock, 'success');

cy.mock(fooMock, {})

// Parameters<typeof Scenario>