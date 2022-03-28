// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('createTask', (task: string) => {
  cy.findByTestId('cta-button').click();
  cy.findByTestId('add-new-form')
    .within(() => {
      cy.findAllByRole('textbox').first().type(task);
    })
    .submit();

  cy.findByText(task).should('be.visible');
});

Cypress.Commands.add('deleteTask', (task: string) => {
  cy.findByText(task)
    .trigger('touchstart', {
      touches: [{ clientY: 40, clientX: 0 }],
      waitForAnimations: false,
    })
    .trigger('touchmove', {
      touches: [{ clientY: 40, clientX: -50 }],
      waitForAnimations: false,
    })
    .trigger('touchmove', {
      touches: [{ clientY: 40, clientX: -100 }],
      waitForAnimations: false,
    })
    .trigger('touchmove', {
      touches: [{ clientY: 40, clientX: -150 }],
      waitForAnimations: false,
    })
    .trigger('touchend', {
      touches: [{ clientY: 40, clientX: -160 }],
      waitForAnimations: false,
    })
    .should('not.exist');
});
