/// <reference types="Cypress"/>

beforeEach(() =>{
  cy.visit('http://192.168.0.124:8080')
})


it("verifys first page", () => {

  cy.get("#loading").should("have.class", "d-flex justify-content-center");
  cy.get("#pokemon-page").should("have.class", "container text-center visually-hidden");
  cy.get("#pagination").should("have.class", "d-grid gap-2 d-md-flex justify-content-md-center visually-hidden");

  cy.get("#loading").should("have.class", "d-flex justify-content-center visually-hidden");
  cy.get("#pokemon-page").should("have.class", "container text-center");
  cy.get("#pagination").should("have.class", "d-grid gap-2 d-md-flex justify-content-md-center");

  cy.get("#page").should("have.value", 1);
  cy.get("#previous").contains("Previous");
  cy.get("#next").contains("Next");
})

it("verifys page changing", () => {

 
  
  cy.get("#page").clear().type("5");
  cy.get("#next").click()


  cy.get(".pokemon").should("be.visible");
  cy.get(".pokemon").should("have.length", 20);


  cy.get("#previous").click();
  cy.get("#page").should("have.value", 4);
  cy.get(".pokemon").should("be.visible");
  cy.get(".pokemon").should("have.length", 20);
 
});

it("verifys pokemon selection", () => {
  
  const $pokemonList = cy.get(".pokemon");
  const $stats = cy.get("#stats");
 
  
  cy.get("#stats").should('not.be.visible');
  cy.get(".pokemon").eq(0).click();
  cy.get("#stats").should("be.visible");
  cy.get("#type").should("be.visible");


  cy.get("#close-button").click();
  cy.get("#stats").should("not.be.visible");
  



})

it("verifys each pokemon contain stats", () => {
  
  cy.wait(4000);

  cy.get(".pokemon").each((pokemon) => {
      cy.get(pokemon).click();
      cy.get("#stats").should("be.visible");
      cy.get("#modal-img").should("be.visible");

      cy.get("#type").should("be.visible");
      cy.get("#hp").should("be.visible");
      cy.get("#attack").should("be.visible");
      cy.get("#defense").should("be.visible");
      cy.get("#special-attack").should("be.visible");
      cy.get("#special-defense").should("be.visible");
      cy.get("#speed").should("be.visible");

      cy.get("#close-button").click();
  })
})
