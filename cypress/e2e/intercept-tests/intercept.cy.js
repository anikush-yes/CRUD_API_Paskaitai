/// <reference types="cypress" />

///Intercept paaiskinimas


it('Get a post/mock post', () => {
    //gauti originalų post kurio id = 1
    cy.request("GET", "https://jsonplaceholder.typicode.com/posts/1").then((response) => {
        cy.log(response.body);
    });

    // cy.intercept, nereaguoja į cy.request
    // cy.intercept reaguoja tik į cy.visit

    //Sumanipuliuoti, periimti post kurio id = 1
    //{userId: 104, title: 'perimtas pavadinimas', id: 104}
    cy.intercept('GET', "https://jsonplaceholder.typicode.com/todos/1", {
        ststusCode: 201,
        body: { userId: 104, title: 'perimtas pavadinimas', id: 104 }
    }).as('getPostMock');
    cy.visit('https://jsonplaceholder.typicode.com');
    cy.get('#run-button').click();
    cy.wait('@getPostMock');
});
