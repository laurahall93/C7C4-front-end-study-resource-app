describe("Add a new resource", () => {
    it("Signs in as a user, adds a resource and returns to the all resources page", () => {
        cy.intercept("/users*").as("getUsers");
        cy.intercept("/resources*").as("getResources");
        cy.visit("http://localhost:3000//");
        cy.wait(["@getResources", "@getUsers"]);
        cy.wait(1500);
        cy.get("select").select("Adil Rahman");
        cy.contains("Adil Rahman");
        cy.wait(1500);
        cy.contains("Show more").click();
        cy.wait(1500);
        cy.contains("Show less").click();
        cy.wait(1500);
        cy.contains("Add new resource").click();
        cy.wait(1500);
        cy.contains("View Study List").click();
        cy.wait(1500);
        cy.contains("View all Resources").click();
        cy.wait(1500);
    });
});
