import NavigationAndOptionInput from "./NavigationAndOptionInput";
import Page from "./Page";

export default class SequencePage
  extends NavigationAndOptionInput
  implements Page
{
  checkUrl() {
    cy.url().should("include", "sequence");
  }
  checkLabel() {
    //TODO
  }
}
