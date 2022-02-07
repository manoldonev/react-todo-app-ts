import { render, screen } from '@testing-library/react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { queryClient } from '../queryClient';

test('renders todo app link', () => {
  render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>,
  );

  const linkElement = screen.getByText(/todo app/i);
  expect(linkElement).toBeInTheDocument();
});
