import PageManager from "../pages/PageManager";

const pages = new PageManager();

describe("Can create a book", () => {
  it("loads home page and clicks continue", () => {
    pages.start.goto();
    pages.start.checkUrl();
    pages.start.clickContinue();

    cy.log("pages");
    pages.pages.checkUrl();
    pages.pages.checkLabel();
    pages.pages.input("160");
    pages.pages.clickContinue();

    cy.log("maximum");
    pages.max.checkUrl();
    //pages.max.checkLabel();
    pages.max.input("164");
    pages.max.clickContinue();

    cy.log("signatures");
    pages.signatures.checkUrl();
    pages.signatures.toggleOption("4");
    pages.signatures.toggleOption("5");
    pages.signatures.clickContinue();

    cy.log("option");
    pages.option.checkUrl();
    pages.option.toggleOption("2");
    pages.option.clickContinue();

    cy.log("sequence");
    pages.sequence.checkUrl();
    pages.sequence.toggleOption("106");
    pages.sequence.clickContinue();

    cy.log("report");
    pages.report.checkUrl();
  });
});
