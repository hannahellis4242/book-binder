import NavigationAndTextInput from "./NavigationAndTextInput";
import Page from "./Page";

export default class PagesPage extends NavigationAndTextInput implements Page {
  checkUrl() {
    cy.url().should("include", "pages");
  }
  checkLabel() {
    cy.get("label").should(
      "contain.text",
      "How many pages does your book have?"
    );
  }
}
