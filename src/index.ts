/* eslint-disable no-unused-vars */
import CypressMock, { CypressMockProps, RecordKey } from "./cypress-mock";
import { mockFn } from "./mock-fn";

declare global {
  namespace Cypress {
    interface Chainable {
      newMock<Scenario extends RecordKey>(
        props: CypressMockProps<Scenario>
      ): CypressMock<Scenario>;

      mock<Scenario extends RecordKey>(
        mock: CypressMock<Scenario>,
        scenario: Scenario
      ): Chainable;
    }
  }
}

Cypress.Commands.add("newMock", CypressMock.new);

Cypress.Commands.add("mock", mockFn);

const fooMock = cy.newMock({
  method: "GET",
  route: "",
  getBody: ({ bar }: { bar: string }) => ({}),
  scenarios: {
    success: {
      statusCode: 200,
      body: {},
    },
  },
});

cy.mock(fooMock, "success");
