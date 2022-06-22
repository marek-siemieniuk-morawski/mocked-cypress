import waitFn from "../../src/commands/wait-fn";
import CypressMock from "../../src/cypress-mock";

describe("waitFn()", () => {
  it(`calls cy.wait with cypressMock.alias if passed CypressMock instance`, () => {
    const cyWaitSpy = cy.stub(cy, "wait");
    const mock = CypressMock.new({
      route: "",
      method: "GET",
      alias: "mockAlias",
      scenario: {
        foo: {
          statusCode: 200,
          default: true,
          body: {},
        },
      },
    });

    waitFn(cy.wait, mock);

    expect(cyWaitSpy).to.be.calledWith("@mockAlias");
  });

  it("calls cy.wait with alias if passed a string", () => {
    const cyWaitSpy = cy.stub(cy, "wait");

    waitFn(cy.wait, "alias");

    expect(cyWaitSpy).to.be.calledWith("alias");
  });
});
