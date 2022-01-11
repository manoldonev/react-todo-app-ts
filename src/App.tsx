import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Todos, Header, BottomNavigation } from './components';

const queryClient = new QueryClient();

const App = (): JSX.Element => (
  <div>
    <Header />
    <QueryClientProvider client={queryClient}>
      <Todos />
      <ReactQueryDevtools />
    </QueryClientProvider>
    <BottomNavigation />
  </div>
);

export { App };
