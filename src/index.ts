/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import Mock, { MockProps } from "./mock";
import mockFn from "./mock-fn";
import { RecordKey, MockResponse } from "./types";

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      newMock<Scenario extends RecordKey, BodyData, Body>(
        props: MockProps<Scenario, BodyData, Body>
      ): Mock<Scenario, BodyData, Body>;

      mock<Scenario extends RecordKey, BodyData, Body>(
        mock: Mock<Scenario, BodyData, Body>,
        scenario: Scenario
      ): Chainable;

      mock<Scenario extends RecordKey, BodyData, Body>(
        mock: Mock<Scenario, BodyData, Body>,
        scenario: Omit<MockResponse<Body>, "default">
      ): Chainable;
    }
  }
}

Cypress.Commands.add("newMock", Mock.new);

Cypress.Commands.add("mock", mockFn);
