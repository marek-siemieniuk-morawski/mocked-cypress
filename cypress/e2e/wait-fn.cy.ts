import waitFn from "../../src/commands/wait-fn";
import Mock from "../../src/mock";

describe("waitFn()", () => {
  it(`calls cy.wait() with mock.alias if passed Mock instance`, () => {
    const cyWaitSpy = cy.stub(cy, "wait");
    const mock = Mock.new({
      route: "",
      method: "GET",
      alias: "mockAlias",
      scenario: {
        success: {
          statusCode: 200,
          body: {},
        },
      },
    });

    waitFn(cy.wait, undefined, mock);

    expect(cyWaitSpy).to.be.calledWith(undefined, "@mockAlias", undefined);
  });

  it("calls cy.wait() as a string if passed a string", () => {
    const cyWaitSpy = cy.stub(cy, "wait");

    waitFn(cy.wait, undefined, "alias");

    expect(cyWaitSpy).to.be.calledWith(undefined, "alias", undefined);
  });
});
