import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Todos } from './components/Todos';

const queryClient = new QueryClient();

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <h1 className="text-xl text-center font-bold">Todo App</h1>
    <div className="flex justify-center">
      <Todos />
    </div>

    <ReactQueryDevtools />
  </QueryClientProvider>
);

export { App };
