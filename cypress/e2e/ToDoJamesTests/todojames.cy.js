//cy.visit()

it('Create new to do', () => {
    cy.visit('https://todolist.james.am/#/');

//1.priversti robota suvesti uzduoties pavadinima
//1.1 turim patikrinti ar input egzistuoja
//1.2 turim ivesti konkretu teksta i input

//document.querySelector("p")  ("#id") (".class")


    cy.get('input.new-todo').type('1 uzduotis{enter}');
//patikrinti ar pirma uzduotis atsidare uzduociu sarase

});


