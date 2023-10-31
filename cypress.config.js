const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'http://localhost:3000',
    video: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 250000,
    requestTimeout: 250000,
    responseTimeout: 250000,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      inlineAssets: true,
      charts: true,
      consoleReporter: 'spec',
      reportFilename: "index",
      overwrite: true,
      html: false,
      json: true
    }
  }
})
