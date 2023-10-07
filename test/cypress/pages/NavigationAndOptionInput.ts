export default class NavigationAndOptionInput {
  clickContinue() {
    cy.get("button").contains("Continue").click();
  }
  toggleOption(value: string) {
    cy.get(`#${value}`).click();
  }
}
