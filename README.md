![license](https://img.shields.io/github/license/manoldonev/react-todo-app-ts?style=plastic) ![ci workflow](https://github.com/manoldonev/react-todo-app-ts/workflows/ci/badge.svg) ![deploy workflow](https://github.com/manoldonev/react-todo-app-ts/workflows/deploy/badge.svg) ![cypress workflow](https://github.com/manoldonev/react-todo-app-ts/workflows/cypress/badge.svg)

Latest deployment available at https://manoldonev.github.io/react-todo-app-ts/

# React Todo App

Based on the [React TypeScript App](https://github.com/manoldonev/react-app-template-ts) GitHub template repo:

- Vite (super-fast project tooling)
- React 18
- TypeScript
- ESLint
- Prettier
- pre-commit hooks
- CI / deployment GitHub workflows
- Dependency management via [Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/)
- Package management via [pnpm](https://pnpm.io/)

## UX & Theming

- Mobile-first design
- Tailwind (utility-first CSS framework)
- Dark Mode Support (utilizing tailwind "class" strategy)
- Branding via custom "material design" palette (vs generic tailwind colors scheme)

## State Management

- Jotai (primitive and flexible state management for React)

## Data (Async State Management)

- GraphQL
- `react-query` with [automatic hooks generation](https://www.graphql-code-generator.com/) based on the GraphQL schema

## Navigation

- React Router v6 (with routes code-splitting)

## Testing

- End-to-end testing: Cypress (with GitHub Actions workflow)
- Unit & Integration testing: Jest with React Testing Library setup (dynamically extract & inject tailwind css in jsdom test environment -- see https://github.com/manoldonev/react-todo-app-ts/pull/57)
- Static Analysis: TypeScript & ESLint
- [MSW](https://mswjs.io/) (Mock Service Worker) API mocking (intercepting requests on the network level)
