describe("My First Test", () => {
    it('clicks the "URL"', () => {
        cy.visit("http://localhost:3000/");
        cy.get("select").select("Adil Rahman");
        cy.contains("Adil Rahman");
        cy.contains("Add new resource").click();
        cy.get("input[name=title]").type("cypress-testing");
        cy.get("input[name=author]").type("Adil");
        cy.get("input[name=url]").type("https://www.google.com/");
        cy.get("input[name=description]").type("test description");
        cy.get("input[name=Node]").click();
        cy.get("input[name=type]").type("video");
        cy.get("input[name=first_study_time]").type("build week 10");
        cy.get("input[id=option1]").click();
        cy.get("input[name=comment_reason]").type("its amazing");
        cy.get("button[name=submit-btn]").click();
    });
});
