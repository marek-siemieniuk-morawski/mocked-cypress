/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

/// <reference types="cypress" />

import CypressMock, { CypressMockProps } from "./src/cypress-mock";
import { CypressMockResponse, RecordKey } from "./src/types";

declare namespace Cypress {
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
