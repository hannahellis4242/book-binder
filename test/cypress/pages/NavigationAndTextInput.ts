import Navigation from "./Navigation";

export default class NavigationAndTextInput extends Navigation {
  input(value: string) {
    cy.get("input").type(value);
  }
}
