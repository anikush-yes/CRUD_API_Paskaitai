
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

    // Duomenu generavimo kodas, sukuria ir todos.js faila

    // it('Duomenu generavimas', () => {
    //     let tasks = [];
    //     for (let i = 1; i <= 100; i++) {
    //         tasks.push(i + "užduotis");
    //     }
    //     console.log(tasks);
    //     cy.writeFile("cypress/fixtures/todos.json", { "todos": tasks });

    // })


    // Duomenu suvedimas su ciklu

    // it('100 tasks on the toDoJames website', () => {

    //     cy.visit('https://todolist.james.am/#/');
    //     for (let i = 1; i <= 100; i++) {
    //         cy.get('input.new-todo').type(i + ' uzduotis{enter}');
    //     }
    //     cy.contains('ul.todo-list li', '1 užduotis').should('be.visible');


    // })

    //Duomenu suvedimas is failo

    // it('100 tasks on the toDoJames website', () => {
    //     cy.visit('https://todolist.james.am/#/');

    //     cy.fixture('todos.json').as('Todos').then((todos) => {
    //         cy.contains('ul.todo-list li', '1 užduotis').should('be.visible');
    //     });
    // });

    //Konkretaus elemento paemimas


    it('100 tasks on the toDoJames website', () => {
        cy.visit('https://todolist.james.am/#/');

        cy.fixture('todos.json').as('Todos').then((todosFile) => {
            cy.log(todosFile);
            cy.log(todosFile.todos[54]);

            //1budas
            // for(let i=0; i < todosFile.todos.lrngth -1; i++) {
            //     cy.get('input.new-todo').type(todosFile.todos[i] + '{enter}');
            // }


            //2budas
            todosFile.todos.forEach((todo) => {
                cy.get('input.new-todo').type(todo + '{enter}');
            })
            //Kokiu paprasciausiu budu dabar mes galime istestuoti, kad visi 100 elementu yra sarase?

            //patikrinti ar yra bent vienas elementas sarase tarp 1 ir masyvo ilgio
            //patikrinti ar yra  1 ir paskutinis elementai
            //ul li elementu ilgis turi buti masyvo ilgis
            cy.get('ul.todo-list li').should('have.length', todosFile.todos.length);
        });


        cy.visit('https://todolist.james.am/#/');
        //ul li elementu ilgis turi buti 100
        cy.get('ul.todo-list li').should('have.length', 100);
    });



});
