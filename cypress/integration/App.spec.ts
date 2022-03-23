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

      cy.findByTestId('todo-list')
        .should('be.visible')
        .within(() => {
          cy.findAllByRole('listitem').should('have.length', 10);
        });

      cy.findByTestId('cta-button').should('be.visible').should('have.class', 'fixed');

      cy.findByTestId('top-navigation').should('not.be.visible');

      cy.findByTestId('bottom-navigation').should('be.visible');
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

      cy.findByText(testValue).should('be.visible').deleteTask(testValue);
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
      cy.findByText(/todo app/i).should('be.visible');

      cy.findAllByRole('listitem')
        .first()
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
        });

      cy.findByText(testValue).should('not.be.visible');
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

      cy.findByTestId('todo-list')
        .should('be.visible')
        .within(() => {
          cy.findAllByRole('listitem').should('have.length', 10);
        });

      cy.findByTestId('cta-button').should('be.visible').should('have.class', 'fixed');

      cy.findByTestId('top-navigation').should('be.visible');

      cy.findByTestId('bottom-navigation').should('not.be.visible');
    });
  });
});
