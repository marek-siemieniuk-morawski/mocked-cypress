import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    video: false,
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
