import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Todos } from './components/Todos';

const queryClient = new QueryClient();

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <h1 className="text-xl font-bold text-center">Todo App</h1>

    <Todos className="p-1.5" />

    <ReactQueryDevtools />
  </QueryClientProvider>
);

export { App };
