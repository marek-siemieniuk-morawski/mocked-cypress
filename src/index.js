import CypressMock from "./cypress-mock";
import mockFn from "./mock-fn";

Cypress.Commands.add("newMock", CypressMock.new);

Cypress.Commands.add("mock", mockFn);
