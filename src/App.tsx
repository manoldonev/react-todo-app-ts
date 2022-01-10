import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Header } from './components/Header';
import { Todos } from './components/Todos';

const queryClient = new QueryClient();

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <Header />
    <Todos />

    <ReactQueryDevtools />
  </QueryClientProvider>
);

export { App };
