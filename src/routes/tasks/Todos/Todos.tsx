import { EmojiSadIcon } from '@heroicons/react/outline';
import { useAtom } from 'jotai';
import { convertRemToPixels } from '../../../utils';
import { TodoItem } from '../TodoItem';
import { useTodos } from './query';
import { queryAtom } from '../../../atoms';
import { Masonry } from '../../../components/Masonry';

const masonryOptions = {
  gutter: convertRemToPixels(0.75),
  stagger: '0.03s',
  horizontalOrder: false,
};

const Todos = (): JSX.Element => {
  const { data, hasNextPage, isEmpty, sentryRef } = useTodos();
  const [query, setQuery] = useAtom(queryAtom);

  return (
    <div className="min-h-screen bg-background p-2.5 transition-colors">
      {!isEmpty ? (
        <>
          <Masonry as="ul" options={masonryOptions}>
            {data?.pages.map((page) => page.todos?.map((todo) => <TodoItem key={todo?.id} data={todo} />))}
          </Masonry>
          {hasNextPage && (
            <div ref={sentryRef}>
              <h2 className="text-on-background">Loading...</h2>
            </div>
          )}
        </>
      ) : (
        <div className="flex min-h-screen items-center justify-center pb-40 text-on-background">
          <div className="flex flex-col items-center">
            <EmojiSadIcon className="h-40 w-40" />
            <span>No items available</span>
            {query !== '' && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mt-2 rounded-lg border border-secondary bg-background px-5 py-2.5 text-center text-sm font-medium text-secondary outline-none hover:bg-secondary-variant hover:text-on-secondary focus:ring-4 focus:ring-secondary/50"
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
