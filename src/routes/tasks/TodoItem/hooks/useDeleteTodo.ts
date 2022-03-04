import type { UseMutationResult } from 'react-query';
import { useQueryClient } from 'react-query';
import type { DeleteTodoMutation, DeleteTodoMutationVariables } from '../../../../generated';
import { useDeleteTodoMutation } from '../../../../generated';

const useDeleteTodo = (): UseMutationResult<DeleteTodoMutation, Error, DeleteTodoMutationVariables> => {
  const queryClient = useQueryClient();

  return useDeleteTodoMutation({
    onSuccess: async () => queryClient.invalidateQueries('Todos.infinite'),
  });
};

export { useDeleteTodo };
