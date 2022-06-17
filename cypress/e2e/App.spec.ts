import type { Result } from 'axe-core';

const terminalLog = (violations: Result[]): void => {
  cy.task(
    'log',
    `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${
      violations.length === 1 ? 'was' : 'were'
    } detected`,
  );

  const violationData = violations.map(({ id, impact, description, nodes }) => ({
    id,
    impact,
    description,
    nodes: nodes.length,
  }));

  cy.task('table', violationData);
};

describe('Todo App', () => {
  describe('on mobile', () => {
    before(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Cypress.automation('remote:debugger:protocol', {
        command: 'Emulation.setTouchEmulationEnabled',
        params: {
          enabled: true,
        },
      });
    });
    beforeEach(() => {
      cy.viewport('iphone-xr');
      cy.visit('/');
    });

    it('renders without crashing', () => {
      cy.findByText(/todo app/i).should('be.visible');

      cy.findByRole('search').should('be.visible');

      cy.findByRole('list')
        .should('be.visible')
        .within(() => {
          cy.findAllByRole('listitem').should('have.length', 10);
        });

      cy.findByTestId('cta-button').should('be.visible').should('have.class', 'fixed');

      cy.findByTestId('top-navigation').should('not.be.visible');

      cy.findByTestId('bottom-navigation').should('be.visible');

      cy.injectAxe();
      // TODO: investigate discrepancy with Lighthouse color-contrast check
      cy.configureAxe({
        rules: [
          {
            id: 'color-contrast',
            enabled: false,
          },
        ],
      });
      cy.checkA11y(undefined, undefined, terminalLog);
    });

    it('creates todo item', () => {
      cy.findByTestId('cta-button').click();

      const testValue = `cy ${Date.now()}`;
      cy.findByTestId('add-new-form')
        .should('be.visible')
        .within(() => {
          cy.findAllByRole('textbox').should('be.visible').should('have.length', 2).first().type(testValue);
          cy.findByText(/save/i).click();
        });

      cy.findByText(testValue).should('be.visible');
      cy.deleteTask(testValue);
    });

    it('creates todo item requires validation', () => {
      const testValue = `cy ${Date.now()}`;
      const requiredText = 'At least one of the fields is required';

      cy.findByTestId('cta-button').click();
      cy.findByTestId('add-new-form')
        .submit()
        .within(() => {
          cy.findAllByText(requiredText).should('be.visible').should('have.length', 2);
          cy.findAllByRole('textbox').first().focus().blur();
          cy.findByText(requiredText).should('be.visible');
          cy.findAllByRole('textbox').last().type(testValue);
        })
        .submit();
      cy.deleteTask(testValue);
    });

    it('updates todo item', () => {
      const testValue = `cy ${Date.now()}`;
      cy.createTask(testValue)
        .should('not.have.class', 'line-through')
        .trigger('touchstart', { waitForAnimations: false })
        .trigger('touchend', { waitForAnimations: false })
        .should('have.class', 'line-through')
        .trigger('touchstart', { waitForAnimations: false })
        .trigger('touchend', { waitForAnimations: false })
        .should('not.have.class', 'line-through')
        .deleteTask(testValue);
    });

    it('deletes todo item', () => {
      const testValue = `cy ${Date.now()}`;
      cy.createTask(testValue);
      cy.deleteTask(testValue).should('not.exist');
    });
  });

  describe('on desktop', () => {
    before(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Cypress.automation('remote:debugger:protocol', {
        command: 'Emulation.setTouchEmulationEnabled',
        params: {
          enabled: false,
        },
      });
    });

    beforeEach(() => {
      cy.viewport('macbook-15');
      cy.visit('/');
    });

    it('renders without crashing', () => {
      cy.findByText(/todo app/i).should('be.visible');

      cy.findByRole('search').should('be.visible');

      cy.findByRole('list')
        .should('be.visible')
        .within(() => {
          cy.findAllByRole('listitem').should('have.length', 10);
        });

      cy.findByTestId('cta-button').should('be.visible').should('have.class', 'fixed');

      cy.findByTestId('top-navigation').should('be.visible');

      cy.findByTestId('bottom-navigation').should('not.be.visible');

      cy.injectAxe();
      // TODO: investigate discrepancy with Lighthouse color-contrast check
      cy.configureAxe({
        rules: [
          {
            id: 'color-contrast',
            enabled: false,
          },
        ],
      });
      cy.checkA11y(undefined, undefined, terminalLog);
    });
  });
});
