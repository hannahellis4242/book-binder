import Page from "./Page";

export default class ReportPage implements Page {
  checkUrl() {
    cy.url().should("include", "report");
  }
}
