import { mockTodosQuery } from '../generated';
import { todos } from './todos';

const defaultPage = 1;
const defaultLimit = 10;

export const handlers = [
  mockTodosQuery((req, res, ctx) => {
    const { page, limit } = req.variables;
    const start = ((page ?? defaultPage) - 1) * (limit ?? defaultLimit);
    const end = start + 10;

    return res(
      ctx.data({
        todos: [...todos].reverse().slice(start, end),
      }),
    );
  }),
];
