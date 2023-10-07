import NavigationAndOptionInput from "./NavigationAndOptionInput";
import Page from "./Page";

export default class SignaturesPage
  extends NavigationAndOptionInput
  implements Page
{
  checkUrl() {
    cy.url().should("include", "signatures");
  }
  checkLabel() {
    //TODO
  }
}
