export default class Navigation {
  clickContinue() {
    cy.get("button").contains("Continue").click();
  }
}
