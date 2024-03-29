![license](https://img.shields.io/github/license/manoldonev/react-todo-app-ts?style=plastic) ![ci workflow](https://github.com/manoldonev/react-todo-app-ts/workflows/ci/badge.svg) ![deploy workflow](https://github.com/manoldonev/react-todo-app-ts/workflows/deploy/badge.svg) ![cypress workflow](https://github.com/manoldonev/react-todo-app-ts/workflows/cypress/badge.svg) ![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-f69203.svg?logo=pnpm)

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
- `@tanstack/react-query` with [automatic hooks generation](https://www.graphql-code-generator.com/) based on the GraphQL schema

## Navigation

- React Router v6 (with routes code-splitting)

## Testing

- End-to-end testing: Cypress (with GitHub Actions workflow)
- Unit & Integration testing: Vitest with React Testing Library setup (dynamically extract & inject tailwind css in jsdom test environment -- see https://github.com/manoldonev/react-todo-app-ts/pull/57)
- Static Analysis: TypeScript & ESLint
- [MSW](https://mswjs.io/) (Mock Service Worker) API mocking (intercepting requests on the network level)

## Preview

<img src="https://user-images.githubusercontent.com/2650247/179395094-8351c8f8-48e4-4b54-9321-9662dd76e892.png" width="333px" height="721px"> <img src="https://user-images.githubusercontent.com/2650247/179395321-c163fdd5-0131-4378-832d-cf017d63e63f.png" width="665px" height="712px">
