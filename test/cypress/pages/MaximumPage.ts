import NavigationAndTextInput from "./NavigationAndTextInput";
import Page from "./Page";

export default class MaximumPage
  extends NavigationAndTextInput
  implements Page
{
  checkUrl() {
    cy.url().should("include", "max");
  }
  checkLabel() {
    cy.get("label").should(
      "have.text",
      "What is the maximum number of pages you will allow your book to have?"
    );
  }
}
