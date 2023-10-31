import 'cypress-mochawesome-reporter/register';
import './commands'

const options = {
    enableExtendedCollector: true,
};

require('cypress-terminal-report/src/installLogsCollector')(options);

afterEach(() => {
    cy.wait(50, { log: false }).then(() => cy.addTestContext(Cypress.TerminalReport.getLogs('txt')))
});