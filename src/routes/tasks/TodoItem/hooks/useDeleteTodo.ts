import type { InfiniteData, QueryKey, UseMutationResult } from 'react-query';
import { useQueryClient } from 'react-query';
import produce from 'immer';
import type { QueryFilters } from 'react-query/types/core/utils';
import type { DeleteTodoMutation, DeleteTodoMutationVariables, TodosQuery } from '../../../../generated';
import { useDeleteTodoMutation } from '../../../../generated';

interface MutationContext {
  previousQueries: Array<[QueryKey, InfiniteData<TodosQuery>]>;
}

const useDeleteTodo = (): UseMutationResult<DeleteTodoMutation, Error, DeleteTodoMutationVariables> => {
  const queryClient = useQueryClient();

  return useDeleteTodoMutation<Error, MutationContext>({
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(['Todos.infinite']);

      const queryFilter: QueryFilters = {
        queryKey: ['Todos.infinite'],
        type: 'active',
      };

      const previousQueries = queryClient.getQueriesData<InfiniteData<TodosQuery>>(queryFilter);

      queryClient.setQueriesData<InfiniteData<TodosQuery>>(queryFilter, (oldData) => {
        if (oldData == null) {
          throw new Error(`An error has occurred while deleting item ${id}.`);
        }

        return produce(oldData, (draft) => {
          draft.pages.some((page) => {
            if (page.todos != null) {
              const itemIndex = page.todos.findIndex((item) => item?.id === id);
              if (itemIndex !== -1) {
                page.todos.splice(itemIndex, 1);
                return true;
              }
            }

            return false;
          });
        });
      });

      return { previousQueries };
    },
    onError: (_err, _variables, context) => {
      context?.previousQueries.forEach((query) => {
        queryClient.setQueryData(...query);
      });
    },
    onSettled: async () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries(['Todos.infinite']);
    },
  });
};
export { useDeleteTodo };
