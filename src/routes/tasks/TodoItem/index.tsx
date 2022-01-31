import { TrashIcon } from '@heroicons/react/outline';
import { useMediaQuery } from '@react-hook/media-query';
import { SwipeToAction } from '../../../components';
import { ActionBar } from './ActionBar';
import { useDeleteTodo } from './useDeleteTodo';

const TodoItem = ({
  data,
}: {
  data: { id: string; task: string; done: boolean } | undefined | null;
}): JSX.Element | null => {
  const isTouchEnabled = useMediaQuery('(pointer: coarse)');
  const { mutate: deleteTodo } = useDeleteTodo();

  if (data == null) {
    return null;
  }

  const deleteItem = (): void => {
    deleteTodo({ id: data.id });
  };

  const content = (
    <>
      <h3>{`Lorem Ipsum #${data.id}`}</h3>
      <p className="line-clamp-3">{data.task}</p>
    </>
  );

  if (!isTouchEnabled) {
    return (
      <li className="w-full mb-3 group last:mb-20 xs:w-56 md:w-60">
        <div className="p-3 border rounded-lg bg-blue-50 border-slate-300">
          <div>{content}</div>
          <ActionBar
            className="group-hover:opacity-100 mt-1.5 opacity-0 transition-opacity duration-500"
            onDelete={deleteItem}
          />
        </div>
      </li>
    );
  }

  return (
    <li className="w-full mb-3 last:mb-20 xs:w-56 md:w-60">
      <SwipeToAction
        onSwiped={deleteItem}
        backgroundChildren={<TrashIcon className="w-6 h-6" />}
        backgroundClassName="bg-red-700 text-white border rounded-lg"
        foregroundClassName="bg-blue-50 border rounded-lg border-slate-300 p-3"
      >
        {content}
      </SwipeToAction>
    </li>
  );
};

export { TodoItem };
