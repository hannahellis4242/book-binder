import Navigation from "./Navigation";
import Page from "./Page";

export default class StartPage extends Navigation implements Page {
  goto() {
    cy.visit("localhost");
  }
  checkUrl() {
    cy.url().should("include", "/");
  }
}
