import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Todos } from '../components';
import { CtaButton } from '../components/CtaButton';

const queryClient = new QueryClient();

const Tasks = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
      <CtaButton className="fixed z-10 md:bottom-8 bottom-24 right-6" />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export { Tasks };
