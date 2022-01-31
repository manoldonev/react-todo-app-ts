import type { UseMutationResult } from 'react-query';
import { useQueryClient } from 'react-query';
import type { CreateTodoMutation, CreateTodoMutationVariables } from '../../../generated';
import { useCreateTodoMutation } from '../../../generated';

const useCreateTodo = (): UseMutationResult<CreateTodoMutation, Error, CreateTodoMutationVariables> => {
  const queryClient = useQueryClient();

  return useCreateTodoMutation({
    onSuccess: async () => queryClient.invalidateQueries('Todos.infinite'),
  });
};

export { useCreateTodo };
