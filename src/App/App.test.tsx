import { render, screen, within } from '@testing-library/react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { queryClient } from '../queryClient';

beforeEach(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });

  window.IntersectionObserver = mockIntersectionObserver;
});

describe('Todo App', () => {
  test('renders todo app link', async () => {
    render(
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>,
    );

    const linkElement = screen.getByText(/todo app/i);
    expect(linkElement).toBeInTheDocument();

    const listElement = await screen.findByTestId('todo-list');
    expect(listElement).toBeInTheDocument();

    const listScope = within(listElement);
    const itemElements = await listScope.findAllByRole('listitem');

    expect(itemElements.length).toEqual(10);
  });
});
