import { chuckNorris } from "../mocks";

describe("api.chucknorris.io", () => {
  it(`mocks api.chucknorris.io with predefined scenario "croatian joke"`, () => {
    cy.mock(chuckNorris.randomJoke, "croatian joke");

    cy.wait(chuckNorris.randomJoke).then(({ response }) => {
      expect(response.body).to.have.property(
        "value",
        `zejd je jednom rekao chuck nofdsfsdfjdsfndsjfbdsjf i skontaj je da mu string nije nul, ali je njega chuck terminirao`
      );
    });
  });

  it(`mocks api.chucknorris.io with another predefined scenario "eating fire and air joke"`, () => {
    cy.mock(chuckNorris.randomJoke, "eating fire and air joke");

    cy.wait(chuckNorris.randomJoke).then(({ response }) => {
      expect(response.body).to.have.property(
        "value",
        `Chuck Norris can eat fire and air.`
      );
    });
  });

  it(`mocks api.chucknorris.io with an explicily defined response`, () => {
    cy.mock(chuckNorris.randomJoke, {
      statusCode: 400,
      body: { errorMessage: "Invalid request" },
    });

    cy.wait(chuckNorris.randomJoke).then(({ response }) => {
      expect(response.statusCode).to.equal(400);
      expect(response.body).to.have.property("errorMessage", "Invalid request");
    });
  });

  it(`mocks api.chucknorris.io with an explicily defined response using args and getBody()`, () => {
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

  it(`mocks api.chucknorris.io with predefined scenario "internal server error"`, () => {
    cy.mock(chuckNorris.randomJoke, "internal server error");

    cy.wait(chuckNorris.randomJoke).then(({ response }) => {
      expect(response.statusCode).to.equal(500);
    });
  });
});
