// type definitions for Cypress object "cy"
/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('App', () => {
  beforeEach(() => {
    cy.visit('/react-todo-app-ts');
  });

  it('renders the app', () => {
    cy.findByText(/todo app/i).should('be.visible');
  });
});
