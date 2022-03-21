![license](https://img.shields.io/github/license/manoldonev/react-todo-app-ts?style=plastic) ![ci workflow](https://github.com/manoldonev/react-todo-app-ts/actions/workflows/main.yml/badge.svg) ![deploy workflow](https://github.com/manoldonev/react-todo-app-ts/actions/workflows/deploy.yml/badge.svg)

Latest deployment available at https://manoldonev.github.io/react-todo-app-ts/

# React Todo App

Based on the [React TypeScript App](https://github.com/manoldonev/react-app-template-ts) GitHub template repo:

- TypeScript
- ESLint
- Prettier
- pre-commit hooks
- CI / deployment GitHub workflows

## UX

- Mobile-first design
- Tailwind (utility-first CSS framework)

## Theming

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

- Jest / React Testing Library setup (dynamically extract & inject tailwind css in jsdom test environment -- see https://github.com/manoldonev/react-todo-app-ts/pull/57)
- Cypress e2e setup (with GitHub Actions workflow integration)
- [MSW](https://mswjs.io/) (Mock Service Worker) API mocking (intercepting requests on the network level)
