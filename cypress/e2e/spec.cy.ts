describe("Add a new resource", () => {
    it("Signs in as a user, adds a resource and returns to the all resources page", () => {
        cy.intercept("/users*").as("getUsers");
        cy.intercept("/resources*").as("getResources");
        cy.intercept("/users/:userId/votes*").as("getUsersVotes");
        cy.intercept("/resources/:id/votes*").as("getResourcesVotes");
        cy.visit("http://localhost:3000//");
        cy.wait(["@getResources", "@getUsers"]);
        cy.wait(1000);
        cy.get("select").select("Adil Rahman");
        cy.contains("Adil Rahman");
        cy.contains("View all Resources").click();
        cy.wait(1000);
        cy.contains("Add new resource").click();
        cy.wait(1000);
        // cy.contains("Show more").click();
        // cy.wait(["@getUsersVotes", "@getResourcesVotes"]);
        // cy.contains("Show less").click();
        cy.contains("View Study List").click();
        cy.wait(1000);
        cy.contains("logout").click();
        cy.wait(1000);

        // cy.get("input[name=title]").type("cypress-testing");
        // cy.get("input[name=author]").type("Adil");
        // cy.get("input[name=url]").type("https://www.google.com/");
        // cy.get("input[name=description]").type("test description");
        // cy.get("input[name=Node]").click();
        // cy.get("input[name=type]").type("video");
        // cy.get("input[name=first_study_time]").type("build week 10");
        // cy.get("input[id=option1]").click();
        // cy.get("input[name=comment_reason]").type("its amazing");
        // cy.get("button[name=submit-btn]").click();
    });
});
