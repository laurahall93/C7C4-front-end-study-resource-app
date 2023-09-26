describe("Add a new resource", () => {
    it("Signs in as Adil, views his study list and logs out to return to all resources page", () => {
        cy.intercept("/users*").as("getUsers");
        cy.intercept("/resources*").as("getResources");
        cy.visit("http://localhost:3000//");
        cy.wait(1500);
        cy.wait(["@getResources", "@getUsers"]);
        cy.get("select").select("Adil Rahman");
        cy.contains("Adil Rahman");
        cy.wait(1500);
        cy.contains("View Study List").click();
        cy.wait(2500);
        cy.contains("Logout").click();
    });
});
