import { useTodosQuery } from '../../generated';

const Todos = (): JSX.Element => {
  const { data, isFetching } = useTodosQuery();

  return (
    <>
      {isFetching && <p>Loading...</p>}
      <ul>
        {data?.todos?.map((todo) => (
          <li key={todo?.id} className="w-60">
            <h3>Lorem Ipsum</h3>
            <p>{todo?.id}</p>
            <p className="line-clamp-3">{todo?.task}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export { Todos };
