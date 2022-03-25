// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import './commands';
import 'cypress-axe';

// TODO: msw & cypress combo triggers test runner endless loop
// https://github.com/mswjs/msw/issues/744
// https://github.com/cypress-io/cypress/issues/16742
// import { worker } from '../../src/mocks/msw/browser';

// before(async () => {
//   return worker.start({
//     serviceWorker: {
//       url: `/react-todo-app-ts/mockServiceWorker.js`,
//     },
//   });
// });
