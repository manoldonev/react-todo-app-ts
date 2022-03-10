import { EmojiSadIcon } from '@heroicons/react/outline';
import Masonry from 'react-masonry-component';
import { useAtom } from 'jotai';
import { convertRemToPixels } from '../../../utils';
import { TodoItem } from '../TodoItem';
import { useTodos } from './hooks/useTodos';
import { queryAtom } from '../../layout/Header';

const Todos = (): JSX.Element => {
  const { data, isFetching, sentryRef } = useTodos();
  const [query, setQuery] = useAtom(queryAtom);
  const masonryOptions = {
    gutter: convertRemToPixels(0.75),
    stagger: '0.03s',
    horizontalOrder: false,
  };

  return (
    <div className="p-1.5 bg-background transition-colors min-h-screen">
      <Masonry elementType="ul" options={masonryOptions} data-testid="todo-list">
        {data?.pages.map((page) => page.todos?.map((todo) => <TodoItem key={todo?.id} data={todo} />))}
        {isFetching && (
          <li ref={sentryRef} role="none">
            <h3 className="text-on-background">Loading...</h3>
          </li>
        )}
      </Masonry>
      {!isFetching && (data?.pages.length === 0 || data?.pages[0].todos?.length === 0) && (
        <div className="flex items-center justify-center min-h-screen pb-40 text-on-background">
          <div className="flex flex-col items-center">
            <EmojiSadIcon className="w-40 h-40" />
            <span>No items available</span>
            {query !== '' && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-secondary bg-background hover:text-on-secondary border border-secondary outline-none hover:bg-secondary-variant focus:ring-4 focus:ring-secondary/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
              >
                Reset Search
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { Todos };
