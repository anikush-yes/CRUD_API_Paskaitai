it('Kreipiames i /products', () =>{
cy.request("GET", "localhost:3000/products")
});