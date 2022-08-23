import { Mock } from "mocked-cypress";

interface Joke {
  categories?: string[];
  iconUrl?: string;
  content: string;
}

export default Mock.new({
  route: "https://api.chucknorris.io/jokes/random",
  method: "GET",
  alias: "randomJoke",
  getBody: (joke: Joke) => ({
    categories: joke.categories || [],
    created_at: new Date().getUTCDate(),
    icon_url: joke.iconUrl,
    id: "FAKeId",
    updated_at: new Date().getUTCDate(),
    value: joke.content,
  }),
  scenario: {
    "eating fire and air joke": {
      statusCode: 200,
      body: {
        categories: [],
        created_at: "2020-01-05 13:42:18.823766",
        icon_url: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id: "rHczvCBwTQCVagEkvndoeA",
        updated_at: "2020-01-05 13:42:18.823766",
        url: "https://api.chucknorris.io/jokes/rHczvCBwTQCVagEkvndoeA",
        value: "Chuck Norris can eat fire and air.",
      },
    },
    "croatian joke": {
      statusCode: 200,
      body: {
        categories: [],
        created_at: "2020-01-05 13:42:29.855523",
        icon_url: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
        id: "oBjH-GACRG2VBjCOhj5EYg",
        updated_at: "2020-01-05 13:42:29.855523",
        url: "https://api.chucknorris.io/jokes/oBjH-GACRG2VBjCOhj5EYg",
        value: `zejd je jednom rekao chuck nofdsfsdfjdsfndsjfbdsjf i skontaj je da mu string nije nul, ali je njega chuck terminirao`,
      },
    },
    "internal server error": {
      statusCode: 500,
      body: {
        message: "Upss... something went wrong. Please try again.",
      },
    },
  },
});
