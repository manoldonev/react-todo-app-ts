const TodoItem = ({ data }: { data: { id: string; task: string; done: boolean } | undefined | null }): JSX.Element => {
  return (
    <li className="w-full p-3 mb-3 border rounded-lg last:mb-20 xs:w-56 md:w-60 bg-blue-50 border-slate-300">
      <h3>Lorem Ipsum</h3>
      <p>
        {data?.id}: <span>{data?.done.toString()}</span>
      </p>
      <p className="line-clamp-3">{data?.task}</p>
    </li>
  );
};

export { TodoItem };
