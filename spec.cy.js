beforeEach(() =>{
    cy.visit("/index.html")
})


it("verifica que el journey del rate list", () => {
  cy.get("#rate-boton").click();
  cy.get("#select option").should("have.length", 169)
  cy.get("#fecha").type("2021-12-31")
  cy.get("#rate-boton").click();

  cy.get("#lista").should("have.class", "");

  
})

it("verifica que al cambiar de rate list entre conversor solo se muestre el seleccionado", () => {
  cy.get("#rate-boton").click();
  cy.get("#conversor-hud").should("have.class", "occult");
  
  cy.get("#conversor-boton").click();
  cy.get("#rate-hud").should("have.class", "occult");
})
  
it("verifica el ingreso correcto del conversor", () => {
  cy.get("#conversor-boton").click();
  cy.get("#primer-select option").should("have.length", 169);
  cy.get("#segundo-select option").should("have.length", 169);

  cy.get("#primer-select").select("USD");
  cy.get("#segundo-select").select("ARS");
  cy.get("#cantidad").type("1500");

  cy.get("#convertir-boton").click();
  cy.get("#resultado").should("have.class", "");

})

it("verifica el ingreso erroneo del conversor", () => {
  cy.get("#conversor-boton").click();
  cy.get("#primer-select option").should("have.length", 169);
  cy.get("#segundo-select option").should("have.length", 169);

  cy.get("#primer-select").select("USD");
  cy.get("#segundo-select").select("ARS");
  cy.get("#cantidad").type("-1500");

  cy.get("#convertir-boton").click();
  cy.get("#resultado").should("have.class", "error");
  cy.get("#conversion").contains("Error! Please, the number entered must be superior to 0");

})


