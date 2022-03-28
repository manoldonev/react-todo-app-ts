import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { App } from './App';
import { matchMedia } from '../setupTests';
import { server } from '../mocks/msw/server';
import { mockTodosQuery } from '../generated';

const queryErrorHandler = jest.fn();

const queryCache = new QueryCache({
  onError: queryErrorHandler,
});

const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const TestApp = (): JSX.Element => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

const simulateTapEvent = (element: Element): void => {
  fireEvent.touchStart(element, { touches: [{ clientX: 0, clientY: 0 }] });
  fireEvent.touchEnd(element, { touches: [{ clientX: 0, clientY: 0 }] });
};

describe('Todo App', () => {
  beforeEach(() => {
    jest.resetAllMocks();

    matchMedia.clear();

    // mock touch screen (as we can only test mobile behavior)
    matchMedia.useMediaQuery('(pointer: coarse)');
  });

  afterEach(() => {
    queryCache.clear();
  });

  /* NOTE: it is not possible to properly test tailwind responsive ui behavior 
  with Jest(jsdom). Generally jsdom neither loads the application css files, 
  nor does it support media queries. We can address the former by manually 
  assembling and injecting the tailwind css styles (see setupTests.ts), 
  however, the latter is a bigger and [currently] unsolvable problem. Mocking 
  media query support (window.matchMedia) is possible either manually or via 
  packages like jest-matchmedia-mock but this only patches scenarios where the 
  component under test actually calls window.matchMedia(...) programmatically. 
  In our [tailwind] scenario we are dynamically injecting the css (including the 
  @media statements for sm/md/lg/etc. screen modifiers) but jsdom does not 
  trigger media query computation hence the screen modifiers remain inactive. As 
  tailwind is a mobile-first library this effectively means we are stuck with the 
  mobile view for testing). */
  describe('on mobile (touch-enabled) screen', () => {
    test('renders without crashing', async () => {
      render(<TestApp />);

      const linkElement = screen.getByText(/todo app/i);
      expect(linkElement).toBeVisible();

      const searchFormElement = screen.getByRole('search');
      expect(searchFormElement).toBeVisible();

      const listElement = await screen.findByRole('list');
      expect(listElement).toBeVisible();

      const listScope = within(listElement);
      const itemElements = await listScope.findAllByRole('listitem');
      expect(itemElements).toHaveLength(10);

      const fabElement = screen.getByTestId('cta-button');
      expect(fabElement).toBeVisible();
      expect(fabElement).toHaveClass('fixed');

      const topNavElement = screen.getByTestId('top-navigation');
      expect(topNavElement).not.toBeVisible();

      const bottomNavElement = screen.getByTestId('bottom-navigation');
      expect(bottomNavElement).toBeVisible();

      expect(queryErrorHandler).not.toHaveBeenCalled();
    });

    test('handles server error gracefully', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      server.use(
        mockTodosQuery((_req, res, ctx) => {
          return res.once(ctx.status(500), ctx.errors([{ message: 'Mocked server error' }]));
        }),
      );

      render(<TestApp />);

      await waitFor(() => expect(queryErrorHandler).toHaveBeenCalledTimes(1));

      const linkElement = screen.getByText(/todo app/i);
      expect(linkElement).toBeVisible();

      const searchFormElement = screen.getByRole('search');
      expect(searchFormElement).toBeVisible();

      const listElement = await screen.findByRole('list');
      const listScope = within(listElement);

      expect(listScope.queryByRole('listitem')).not.toBeInTheDocument();

      const noItemsElement = screen.getByText(/no items available/i);
      expect(noItemsElement).toBeVisible();

      const fabElement = screen.getByTestId('cta-button');
      expect(fabElement).toBeVisible();
      expect(fabElement).toHaveClass('fixed');

      const topNavElement = screen.getByTestId('top-navigation');
      expect(topNavElement).not.toBeVisible();

      const bottomNavElement = screen.getByTestId('bottom-navigation');
      expect(bottomNavElement).toBeVisible();
    });

    test('renders no checkboxes for todo items', async () => {
      render(<TestApp />);

      const listElement = await screen.findByRole('list');
      const listScope = within(listElement);
      const itemElements = await listScope.findAllByRole('listitem');
      expect(itemElements).toHaveLength(10);

      const checkboxElement = listScope.queryByRole('checkbox');
      expect(checkboxElement).not.toBeInTheDocument();
    });

    test('renders correct bottom navigation items', async () => {
      render(<TestApp />);

      const listElement = await screen.findByRole('list');
      expect(listElement).toBeVisible();

      const bottomNavElement = screen.getByTestId('bottom-navigation');
      const navScope = within(bottomNavElement);
      const linkElements = navScope.getAllByRole('link');
      expect(linkElements).toHaveLength(3);

      const tasksElement = linkElements[0];
      expect(tasksElement).toBeVisible();
      expect(tasksElement).toHaveTextContent(/tasks/);
      expect(tasksElement).toHaveClass('bg-primary-variant');

      const analyticsElement = linkElements[1];
      expect(analyticsElement).toBeVisible();
      expect(analyticsElement).toHaveTextContent(/analytics/);
      expect(analyticsElement).not.toHaveClass('bg-primary-variant');

      const settingsElement = linkElements[2];
      expect(settingsElement).toBeVisible();
      expect(settingsElement).toHaveTextContent(/settings/);
      expect(settingsElement).not.toHaveClass('bg-primary-variant');
    });

    test('switches tabs through bottom navigation', async () => {
      render(<TestApp />);

      let listElement = await screen.findByRole('list');
      expect(listElement).toBeVisible();

      const bottomNavElement = screen.getByTestId('bottom-navigation');
      const navScope = within(bottomNavElement);

      const analyticsLink = navScope.getByText(/analytics/i);
      expect(analyticsLink).toBeVisible();

      analyticsLink.click();
      const analyticsTabElement = await screen.findByTestId('analytics');
      expect(analyticsTabElement).toBeVisible();
      expect(listElement).not.toBeVisible();

      const settingsLink = navScope.getByText(/settings/i);
      expect(settingsLink).toBeVisible();

      settingsLink.click();
      const settingsTabElement = await screen.findByTestId('settings');
      expect(settingsTabElement).toBeVisible();
      expect(analyticsTabElement).not.toBeVisible();
      expect(listElement).not.toBeVisible();

      const tasksLink = navScope.getByText(/tasks/i);
      expect(tasksLink).toBeVisible();

      tasksLink.click();
      listElement = await screen.findByRole('list');
      expect(listElement).toBeVisible();
      expect(analyticsTabElement).not.toBeVisible();
      expect(settingsTabElement).not.toBeVisible();
    });

    test('search for todo item', async () => {
      render(<TestApp />);

      const listElement = await screen.findByRole('list');
      expect(listElement).toBeVisible();
      const listScope = within(listElement);

      let itemElements = await listScope.findAllByRole('listitem');
      expect(itemElements).toHaveLength(10);

      const searchElement = screen.getByRole('searchbox');
      expect(searchElement).toBeVisible();

      userEvent.type(searchElement, 'vivacious');
      expect(await listScope.findByRole('listitem')).toBeInTheDocument();

      userEvent.clear(searchElement);
      userEvent.type(searchElement, 'asdf');

      await waitForElementToBeRemoved(() => listScope.queryAllByRole('listitem'));

      const resetElement = screen.getByText(/reset search/i);
      expect(resetElement).toBeVisible();

      resetElement.click();
      expect(resetElement).not.toBeInTheDocument();

      expect(listElement).toBeVisible();
      itemElements = await listScope.findAllByRole('listitem');
      expect(itemElements).toHaveLength(10);
      expect(searchElement).toHaveValue('');
    });

    test('create todo item', async () => {
      render(<TestApp />);

      const listElement = await screen.findByRole('list');
      expect(listElement).toBeVisible();
      const listScope = within(listElement);

      let itemElements = await listScope.findAllByRole('listitem');
      expect(itemElements).toHaveLength(10);

      const fabElement = screen.getByTestId('cta-button');
      expect(fabElement).toBeVisible();

      userEvent.click(fabElement);

      const modalTestId = 'add-new-modal';
      const modalElement = screen.getByTestId(modalTestId);
      expect(modalElement).toBeVisible();

      const modalScope = within(modalElement);
      const inputElements = modalScope.getAllByRole('textbox');
      expect(inputElements).toHaveLength(2);

      const noteElement = modalScope.getByPlaceholderText(/note/i);
      const testValue = 'Add the qwerty!';

      userEvent.type(noteElement, testValue);

      const saveButton = modalScope.getByText(/save/i);
      expect(saveButton).toBeVisible();

      userEvent.click(saveButton);
      await waitForElementToBeRemoved(() => screen.queryByTestId(modalTestId));

      expect(await listScope.findByText(testValue)).toBeVisible();

      itemElements = listScope.getAllByRole('listitem');
      expect(itemElements[0]).toHaveTextContent(testValue);
    });

    test('create todo item validation', async () => {
      render(<TestApp />);

      const listElement = await screen.findByRole('list');
      expect(listElement).toBeVisible();
      const listScope = within(listElement);

      let itemElements = await listScope.findAllByRole('listitem');
      expect(itemElements).toHaveLength(10);

      const fabElement = screen.getByTestId('cta-button');
      expect(fabElement).toBeVisible();

      userEvent.click(fabElement);

      const modalTestId = 'add-new-modal';
      const modalElement = screen.getByTestId(modalTestId);
      expect(modalElement).toBeVisible();

      const modalScope = within(modalElement);
      const saveButton = modalScope.getByText(/save/i);
      expect(saveButton).toBeVisible();

      userEvent.click(saveButton);

      const errorElements = await modalScope.findAllByText(/at least one of the fields is required/i);

      expect(errorElements).toHaveLength(2);
      errorElements.forEach((errorElement) => expect(errorElement).toBeVisible());

      const inputElements = modalScope.getAllByRole('textbox');
      expect(inputElements).toHaveLength(2);

      const titleElement = modalScope.getByPlaceholderText(/title/i);
      const testValue = 'Add the deadbeef!';

      userEvent.type(titleElement, testValue);

      userEvent.click(saveButton);

      await waitForElementToBeRemoved(() => screen.queryByTestId(modalTestId));

      expect(await listScope.findByText(testValue)).toBeVisible();

      itemElements = listScope.getAllByRole('listitem');
      expect(itemElements[0]).toHaveTextContent(testValue);
    });

    test('cancel create todo item should have no side effects', async () => {
      render(<TestApp />);

      const listElement = await screen.findByRole('list');
      expect(listElement).toBeVisible();
      const listScope = within(listElement);

      let itemElements = await listScope.findAllByRole('listitem');
      expect(itemElements).toHaveLength(10);
      const firstElement = itemElements[0];

      const fabElement = screen.getByTestId('cta-button');
      expect(fabElement).toBeVisible();

      userEvent.click(fabElement);

      const modalTestId = 'add-new-modal';
      const modalElement = screen.getByTestId(modalTestId);
      expect(modalElement).toBeVisible();

      const modalScope = within(modalElement);
      const closeButton = modalScope.getByText(/close/i);
      expect(closeButton).toBeVisible();

      userEvent.click(closeButton);

      expect(screen.queryByTestId(modalTestId)).not.toBeInTheDocument();

      itemElements = listScope.getAllByRole('listitem');
      expect(itemElements[0]).toEqual(firstElement);
    });

    test('update todo item', async () => {
      render(<TestApp />);

      const listElement = await screen.findByRole('list');
      expect(listElement).toBeVisible();
      const listScope = within(listElement);

      const itemElements = await listScope.findAllByRole('listitem');
      expect(itemElements).toHaveLength(10);

      const labelMatcher = /write the damn resolver!/i;
      const labelElement = screen.getByText(labelMatcher);
      expect(labelElement).not.toHaveClass('line-through');

      simulateTapEvent(labelElement);

      await waitFor(() => expect(screen.getByText(labelMatcher)).toHaveClass('line-through'));
    });

    // TODO: add keyboard support to test in jsdom
    test.todo('delete todo item');
  });
});
