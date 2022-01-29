import Masonry from 'react-masonry-component';
import { convertRemToPixels } from '../../../utils';
import { TodoItem } from '../TodoItem';
import { useTodos } from './useTodos';

const Todos = (): JSX.Element => {
  const { data, isFetching, sentryRef } = useTodos();
  const masonryOptions = {
    gutter: convertRemToPixels(0.75),
    stagger: '0.03s',
    horizontalOrder: false,
  };

  return (
    <div className="p-1.5">
      <Masonry elementType="ul" options={masonryOptions}>
        {data?.pages.map((page) => page.todos?.map((todo) => <TodoItem key={todo?.id} data={todo} />))}
        {isFetching && (
          <li ref={sentryRef}>
            <h3>Loading...</h3>
          </li>
        )}
      </Masonry>
    </div>
  );
};

export { Todos };
