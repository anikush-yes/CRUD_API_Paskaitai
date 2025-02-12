//cy.visit()

it('Create new to do', () => {
    cy.visit('https://todolist.james.am/#/');

//1.priversti robota suvesti uzduoties pavadinima
//1.1 turim patikrinti ar input egzistuoja
//1.2 turim ivesti konkretu teksta i input

//document.querySelector("p")  ("#id") (".class")


    cy.get('input.new-todo').type('1 uzduotis{enter}');
//patikrinti ar pirma uzduotis atsirado uzduociu sarase

cy.get('ul.todo-list li').should('contain', '1 uzduotis');

});


it('Delete new to do', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('1 uzduotis{enter}')
    cy.get('input.new-todo').type('1 uzduotis trinimui{enter}');
   
    cy.contains('ul.todo-list li', '1 uzduotis trinimui') .find('button.destroy').invoke('show');
    cy.contains('ul.todo-list li', '1 uzduotis trinimui') .find('button.destroy').click();

    
cy.contains('ul.todo-list li', '1 uzduotis trinimui').should('not.exist');



});


it('To do item edit', () =>{
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('2 uzduotis{enter}');
    cy.get('input.new-todo').type('3 uzduotis{enter}');
    cy.get('input.new-todo').type('4 uzduotis{enter}');




cy.contains('ul.todo-list li', '2 uzduotis')
.dblclick()
.find('input.edit')
.clear()
.type('redaguota uzduotis{enter}');

cy.contains('ul.todo-list li', 'redaguota uzduotis').should('be.visible');


});
