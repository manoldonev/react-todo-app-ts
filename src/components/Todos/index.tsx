import Masonry from 'react-masonry-component';
import { convertRemToPixels } from '../../utils';
import { useTodos } from './useTodos';

const Todos = ({ className }: { className?: string }): JSX.Element => {
  const { data, isFetching, sentryRef } = useTodos();
  const masonryOptions = {
    gutter: convertRemToPixels(0.75),
    stagger: '0.03s',
    horizontalOrder: false,
  };

  return (
    <div className={className}>
      <Masonry elementType="ul" options={masonryOptions}>
        {data?.pages.map((page) =>
          page.todos?.map((todo) => (
            <li
              key={todo?.id}
              className="w-full p-3 mb-3 border rounded-lg xs:w-56 md:w-60 bg-blue-50 border-slate-300"
            >
              <h3>Lorem Ipsum</h3>
              <p>{todo?.id}</p>
              <p className="line-clamp-3">{todo?.task}</p>
            </li>
          )),
        )}
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
