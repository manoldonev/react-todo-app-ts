declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to add new task.
     * @example cy.createTask('new task')
     */
    createTask: (task: string) => Chainable<Element>;
    deleteTask: (task: string) => Chainable<Element>;
  }
}
