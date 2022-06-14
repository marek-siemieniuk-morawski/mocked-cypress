/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import CypressMock, { CypressMockProps } from "./cypress-mock";
import mockFn from "./mock-fn";
import { RecordKey, CypressMockResponse } from "./types";

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      newMock<Scenario extends RecordKey, GetBodyData, Body>(
        props: CypressMockProps<Scenario, GetBodyData, Body>
      ): CypressMock<Scenario, GetBodyData, Body>;

      mock<Scenario extends RecordKey, GetBodyData, Body>(
        mock: CypressMock<Scenario, GetBodyData, Body>,
        scenario: Scenario
      ): Chainable;

      mock<Scenario extends RecordKey, GetBodyData, Body>(
        mock: CypressMock<Scenario, GetBodyData, Body>,
        scenario: CypressMockResponse<GetBodyData>
      ): Chainable;
    }
  }
}

Cypress.Commands.add("newMock", CypressMock.new);

Cypress.Commands.add("mock", mockFn);
