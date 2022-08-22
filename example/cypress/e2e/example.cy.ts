import { chuckNorris } from "../mocks";

describe("api.chucknorris.io", () => {
  it("fetches the crotation joke", () => {
    cy.mock(chuckNorris.randomJoke, "croatian joke");

    cy.wait(chuckNorris.randomJoke).then(({ response }) => {
      expect(response.body).to.have.property(
        "value",
        `zejd je jednom rekao chuck nofdsfsdfjdsfndsjfbdsjf i skontaj je da mu string nije nul, ali je njega chuck terminirao`
      );
    });
  });

  it("fetches the joke about Jack Norris eating fire and air", () => {
    cy.mock(chuckNorris.randomJoke, "eating fire and air joke");

    cy.wait(chuckNorris.randomJoke).then(({ response }) => {
      expect(response.body).to.have.property(
        "value",
        `Chuck Norris can eat fire and air.`
      );
    });
  });

  it("fetches a dynamically created joke", () => {
    cy.mock(chuckNorris.randomJoke, {
      statusCode: 200,
      args: {
        categories: ["not funny", "testing"],
        content: `Chuck Norris is so good tester that he tests automatically manually`,
      },
    });

    cy.wait(chuckNorris.randomJoke).then(({ response }) => {
      expect(response.body).to.have.property(
        "value",
        `Chuck Norris is so good tester that he tests automatically manually`
      );
      expect(response.body).to.have.property("categories", [
        "not funny",
        "testing",
      ]);
    });
  });

  it("returns an internal server error", () => {
    cy.mock(chuckNorris.randomJoke, "internal server error");

    cy.wait(chuckNorris.randomJoke).then(({ response }) => {
      expect(response.statusCode).to.equal(500);
    });
  });
});
