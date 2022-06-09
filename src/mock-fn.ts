import CypressMock, { RecordKey } from "./cypress-mock";

export function mockFn<Scenario extends RecordKey>(
  mock: CypressMock<Scenario>,
  scenario: Scenario
) {
  cy.intercept(mock.method, mock.route, mock.scenarios[scenario]);
}
