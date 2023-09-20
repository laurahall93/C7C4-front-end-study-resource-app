describe("My First Test", () => {
    it('clicks the "URL"', () => {
        cy.visit("https://c7c4-study-resource-catalog-app.netlify.app/");

        cy.contains("URL").click();
    });
});
