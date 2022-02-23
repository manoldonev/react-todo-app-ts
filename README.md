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

- Dark Mode Support (using tailwind "class" strategy)
- Enforced custom "material design" palette instead of the standard tailwind colors to simulate a real-world "branded" app scenario (e.g. "primary" / "secondary" / "error" and variations instead of "red" / "green" / "blue" / etc. -- see https://material-foundation.github.io/material-theme-builder/#/custom)

## State Management

- Jotai (primitive and flexible state management for React)

## Data (Async State Management)

- GraphQL
- `react-query` with automatic hooks generation based on the GraphQL schema

## Navigation

- React Router v6 (with routes code-splitting)
