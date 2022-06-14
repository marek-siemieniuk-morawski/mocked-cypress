/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import CypressMock, { CypressMockProps } from "./cypress-mock";
import mockFn from "./mock-fn";
import { RecordKey, CypressMockResponse } from "./types";

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      newMock<Scenario extends RecordKey, BodyData, Body>(
        props: CypressMockProps<Scenario, BodyData, Body>
      ): CypressMock<Scenario, BodyData, Body>;

      mock<Scenario extends RecordKey, BodyData, Body>(
        mock: CypressMock<Scenario, BodyData, Body>,
        scenario: Scenario
      ): Chainable;

      mock<Scenario extends RecordKey, BodyData, Body>(
        mock: CypressMock<Scenario, BodyData, Body>,
        scenario: CypressMockResponse<BodyData>
      ): Chainable;

      mock<Scenario extends RecordKey, BodyData, Body>(
        mock: CypressMock<Scenario, BodyData, Body>,
        scenario: CypressMockResponse<BodyData>,
        override?: CypressMockResponse<Body>
      ): Chainable;
    }
  }
}

Cypress.Commands.add("newMock", CypressMock.new);

Cypress.Commands.add("mock", mockFn);
