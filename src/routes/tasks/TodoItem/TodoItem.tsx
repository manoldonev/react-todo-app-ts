import { TrashIcon } from '@heroicons/react/24/outline';
import { useMediaQuery } from '@react-hook/media-query';
import { SwipeToAction } from '../../../components/SwipeToAction';
import { ActionBar } from './ActionBar';
import { useUpdateTodo, useDeleteTodo } from './query';

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
      <li className="group mb-3 w-full last:mb-20 xs:w-56 md:w-60">
        <div className="rounded-lg border border-outline bg-primary-container px-3 text-on-primary-container transition-colors">
          <h2
            className={`${data.done ? 'text-on-primary-container/75 line-through' : ''}`}
          >{`Lorem Ipsum #${data.id}`}</h2>
          <label
            htmlFor={data.id}
            className={`flex line-clamp-3 ${data.done ? 'text-on-primary-container/75 line-through' : ''}`}
          >
            <input
              type="checkbox"
              className="mx-2 flex-initial accent-secondary"
              id={data.id}
              checked={data.done}
              onChange={toggleItem}
            />
            {data.task}
          </label>
          <ActionBar
            className="my-1 opacity-0 transition-opacity duration-500 group-focus-within:opacity-100 group-hover:opacity-100"
            onDelete={deleteItem}
          />
        </div>
      </li>
    );
  }

  return (
    <li className="mb-3 w-full last:mb-20 xs:w-56 md:w-60">
      <SwipeToAction
        className="rounded-lg border border-outline bg-primary-container px-3 pb-3 text-on-primary-container transition-colors"
        onTap={toggleItem}
        onSwipedLeft={deleteItem}
        onSwipedRight={deleteItem}
        leftChildren={<TrashIcon className="h-6 w-6" />}
        leftChildrenClassName="bg-error-container text-on-error-container border border-outline rounded-lg"
        rightChildren={<TrashIcon className="h-6 w-6" />}
        rightChildrenClassName="bg-error-container text-on-error-container border border-outline rounded-lg"
      >
        <h2
          className={`${data.done ? 'text-on-primary-container/75 line-through' : ''}`}
        >{`Lorem Ipsum #${data.id}`}</h2>
        <label className={`flex line-clamp-3 ${data.done ? 'text-on-primary-container/75 line-through' : ''}`}>
          {data.task}
        </label>
      </SwipeToAction>
    </li>
  );
};

export { TodoItem };
