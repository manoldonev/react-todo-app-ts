import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Todos, Header, BottomNavigation } from './components';

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  return (
    // NOTE: cannot use Fragment here as it will break the sticky header
    <div>
      <Header />
      <QueryClientProvider client={queryClient}>
        <Todos />
        <ReactQueryDevtools />
      </QueryClientProvider>
      <BottomNavigation />
    </div>
  );
};

export { App };
