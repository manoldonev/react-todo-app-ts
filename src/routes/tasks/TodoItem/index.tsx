import { TrashIcon } from '@heroicons/react/outline';
import { useMediaQuery } from '@react-hook/media-query';
import { SwipeToAction } from '../../../components';
import { ActionBar } from './ActionBar';
import { useDeleteTodo } from './useDeleteTodo';
import { useUpdateTodo } from './useUpdateTodo';

const TodoItem = ({
  data,
}: {
  data: { id: string; task: string; done: boolean } | undefined | null;
}): JSX.Element | null => {
  const isTouchEnabled = useMediaQuery('(pointer: coarse)');
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  if (data == null) {
    return null;
  }

  const toggleItem = (): void => {
    updateTodo({ id: data.id, input: { done: !data.done } });
  };

  const deleteItem = (): void => {
    deleteTodo({ id: data.id });
  };

  if (!isTouchEnabled) {
    return (
      <li className="w-full mb-3 group last:mb-20 xs:w-56 md:w-60">
        <div className="px-3 transition-colors border rounded-lg bg-primary-container border-outline text-on-primary-container">
          <h3
            className={`${data.done ? 'line-through text-on-primary-container/60' : ''}`}
          >{`Lorem Ipsum #${data.id}`}</h3>
          <label
            htmlFor={data.id}
            className={`flex line-clamp-3 ${data.done ? 'line-through text-on-primary-container/60' : ''}`}
          >
            <input
              type="checkbox"
              className="flex-initial mx-2 accent-secondary"
              id={data.id}
              checked={data.done}
              onChange={toggleItem}
            />
            {data.task}
          </label>
          <ActionBar
            className="my-1 transition-opacity duration-500 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100"
            onDelete={deleteItem}
          />
        </div>
      </li>
    );
  }

  return (
    <li className="w-full mb-3 last:mb-20 xs:w-56 md:w-60">
      <SwipeToAction
        className="px-3 pb-3 transition-colors border rounded-lg border-outline bg-primary-container text-on-primary-container"
        onTap={toggleItem}
        onSwipedLeft={deleteItem}
        onSwipedRight={deleteItem}
        leftChildren={<TrashIcon className="w-6 h-6" />}
        leftChildrenClassName="bg-error-container text-on-error-container border border-outline rounded-lg"
        rightChildren={<TrashIcon className="w-6 h-6" />}
        rightChildrenClassName="bg-error-container text-on-error-container border border-outline rounded-lg"
      >
        <h3
          className={`${data.done ? 'line-through text-on-primary-container/60' : ''}`}
        >{`Lorem Ipsum #${data.id}`}</h3>
        <label className={`flex line-clamp-3 ${data.done ? 'line-through text-on-primary-container/60' : ''}`}>
          {data.task}
        </label>
      </SwipeToAction>
    </li>
  );
};

export { TodoItem };
