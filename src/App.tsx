import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Todos, Header, BottomNavigation } from './components';

const queryClient = new QueryClient();

const App = (): JSX.Element => (
  <>
    <Header />
    <QueryClientProvider client={queryClient}>
      <Todos />
      <ReactQueryDevtools />
    </QueryClientProvider>
    <BottomNavigation />
  </>
);

export { App };
