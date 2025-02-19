/// <reference types="cypress" />


it('Request, intercept, visit', () => {

//API
cy.request("GET", "https://jsonplaceholder.typicode.com/posts/1").then((response) => {
    // expect(response.status).to.be.eq(200); //ar status kodas 200
});

//Internetinė svetainė
cy.visit('https://todolist.james.am/#/') // tiesiog uzeinu i svetaine

//perimti
//sis metodas dazniau naudojamas API
cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts/104");

});




it('Get a post/mock a post', () =>{
    cy.request("GET", "https://jsonplaceholder.typicode.com/posts/1").then((response) => {
       cy.log(response.body)
    });

    cy.request("GET", "https://jsonplaceholder.typicode.com/posts/1", {body: {userId: 104, title:'perimtas pavadinimas, id:104'}}).as('getPostMock')
cy.wait('@getPostMock');
});