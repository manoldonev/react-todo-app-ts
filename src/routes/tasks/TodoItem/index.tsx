import { TrashIcon } from '@heroicons/react/outline';
import { useQueryClient } from 'react-query';
import { SwipeToAction } from '../../../components';
import { useDeleteTodoMutation } from '../../../generated';

const TodoItem = ({
  data,
}: {
  data: { id: string; task: string; done: boolean } | undefined | null;
}): JSX.Element | null => {
  const queryClient = useQueryClient();
  const { mutate: deleteTodo } = useDeleteTodoMutation({
    onSuccess: async () => queryClient.invalidateQueries('Todos.infinite'),
  });

  if (data == null) {
    return null;
  }

  const deleteItem = (): void => {
    deleteTodo({ id: data.id });
  };

  return (
    <li className="w-full mb-3 last:mb-20 xs:w-56 md:w-60">
      <SwipeToAction
        onSwiped={deleteItem}
        backgroundChildren={<TrashIcon className="w-6 h-6" />}
        backgroundClassName="bg-red-700 text-white border rounded-lg"
        foregroundClassName="bg-blue-50 border rounded-lg border-slate-300 p-3"
      >
        <h3>{`Lorem Ipsum #${data.id}`}</h3>
        <p className="line-clamp-3">{data.task}</p>
      </SwipeToAction>
    </li>
  );
};

export { TodoItem };
