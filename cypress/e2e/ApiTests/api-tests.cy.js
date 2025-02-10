
describe('CRUD_API', () => {


    context('/products', () => {


        context('/products atskiri testai', () => {

            it('/products status kodas 200', () => {
                cy.request("GET", "localhost:3000/products").then((response) => {
                    expect(response.status).to.be.eq(200);
                });
            });



            it('/products atsakymo laikas', () => {
                cy.request("GET", "localhost:3000/products").then((response) => {
                    expect(response.duration).to.be.lessThan(1000);
                });
            });



            it('/products netuscias', () => {

                cy.request("GET", "localhost:3000/products").then((response) => {

                    expect(response.body).length.to.be.greaterThan(1);

                });

            });
        });




        it('/products endpoint bendras testas', () => {



            //patikrinti status koda

            cy.request("GET", "localhost:3000/products").then((response) => {

                expect(response.status).to.be.eq(200);

                // response time

                expect(response.duration).to.be.lessThan(1000);


                //patikrinti response body

                expect(response.body).length.to.be.greaterThan(1);


                console.log(response.body);
                cy.log(response.body);
            });
        });



        it('/products vieno produkto bendras testas', () => {
            cy.request("GET", "http://localhost:3000/products/3").then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('id', 3);
                expect(response.body).to.have.property('title', 'Tank Top');
                cy.log(response.body.id);
                cy.log(response.body.title);
                cy.log(response.body);
            });

            cy.log('Produktas rastas');
        });






        it('/products create bendras testas', () => {
            cy.request("POST", "http://localhost:3000/products", {
                title: "Nauja prekė",
                description: "Naujas aprašymas",
                price: 3.99,
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body).to.have.property('title', 'Nauja prekė');
                expect(response.body).to.have.property('description', 'Naujas aprašymas');
                expect(response.body).to.have.property('price', 3.99);
            });

            cy.log('Prduktas sukurtas');
        });



        it('/products update bendras testas', () => {
            cy.request("PUT", "http://localhost:3000/products/update/3", {
                title: "Atnaujinta prekė",
                description: "Atnaujintas aprašymas",
                price: 3.99,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('title', 'Atnaujinta prekė');
                expect(response.body).to.have.property('description', 'Atnaujintas aprašymas');
                expect(response.body).to.have.property('price', 3.99);
            });
            cy.log('{Produktas atnaujintas}')
        });



        it('/products delete bendras testas', () => {
            cy.request("DELETE", "http://localhost:3000/products/delete/20").then((response) => {
                cy.log(' Produktas ištrintas');
            });
        });
        

    });
});



