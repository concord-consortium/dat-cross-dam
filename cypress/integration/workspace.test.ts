context("Test the overall app", () => {
  beforeEach(() => {
    cy.visit("");
  });

  describe("Desktop functionalities", () => {
    it("renders with text", () => {
      cy.get("#app")
        .should("exist");
    });
  });

  describe('Test UI functionalities', () => {

    const toggle = "input#label-toggle";
    const svgText = "svg > text";

    it("defaults to showing the labels", () => {
      cy.get(toggle)
        .should("be.visible")
        .and("checked");
      cy.get(svgText)
        .first()
        .should("be.visible")           // Spot-check that at least one label
        .and("contain", "Farm River");  // is visible and has the right text.
    });

    it("user can hide/un-hide labels over the image", () => {
      cy.get(toggle)                    // First click should hide labels.
        .click();
      cy.get(svgText)
        .should("be.not.visible");
      cy.get(toggle)                    // Second click to un-hide.
        .click();
      cy.get(svgText)
        .should("be.visible");
    });

  });

});
