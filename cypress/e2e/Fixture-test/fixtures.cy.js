
/// <reference types="cypress" />


describe('Fixtures works', () => {




    it('fixtures test', () => {
        cy.fixture('users').as('usersJson').then((users) => {
            cy.log(users);
        });








        cy.fixture('example').as('exampleJson').then((example) => {
            cy.log(example);
        });
        cy.fixture('products').as('productsCsv').then((products) => {
            cy.log(products);
        })



    });
});
