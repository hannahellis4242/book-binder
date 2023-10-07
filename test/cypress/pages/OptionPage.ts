import NavigationAndOptionInput from "./NavigationAndOptionInput";
import Page from "./Page";

export default class OptionPage
  extends NavigationAndOptionInput
  implements Page
{
  checkUrl() {
    cy.url().should("include", "option");
  }
  checkLabel() {
    //TODO
  }
}
