describe("Can create a book", () => {
  it("loads home page and clicks continue", () => {
    cy.visit("localhost");
    cy.url().should("include", "/");
    cy.get("button").contains("Continue").click();

    cy.log("pages");
    cy.url().should("include", "pages");
    cy.get("label").should(
      "contain.text",
      "How many pages does your book have?"
    );
    cy.get("input").type("160");
    cy.get("button").contains("Continue").click();

    cy.log("maximum");
    cy.url().should("include", "max");
    /*cy.get("label").should(
      "have.text",
      "What is the maximum number of pages you will allow your book to have?"
    );*/
    cy.get("input").type("164");
    cy.get("button").contains("Continue").click();

    cy.log("signatures");
    cy.get("#4").click();
    cy.get("#5").click();
    cy.get("button").contains("Continue").click();

    cy.log("option");
    cy.get("#2").click();
    cy.get("button").contains("Continue").click();

    cy.log("sequence");
    cy.get("input").type("4,5,4,5,4,5,4,5,4");
    cy.get("button").contains("Continue").click();
  });
});
