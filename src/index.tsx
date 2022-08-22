import React from 'react';
import { createRoot } from 'react-dom/client';
import '@reach/dialog/styles.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { BrowserTracing } from '@sentry/tracing';
import * as Sentry from '@sentry/react';
import { App } from './App';
import { queryClient } from './queryClient';
import { reportWebVitals } from './reportWebVitals';

const initializeSentry = (): void => {
  Sentry.init({
    dsn: 'https://7928643206cc472292e39de724627115@o1372548.ingest.sentry.io/6677629',
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
};

const initializeMsw = async (): Promise<void> => {
  if (import.meta.env.VITE_API_MOCKING === 'enabled') {
    const { worker } = await import('./mocks/msw/browser');
    await worker.start({
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      },
      onUnhandledRequest: ({ url }, print) => {
        if (!url.pathname.startsWith('/graphql')) {
          return;
        }

        print.error();
      },
    });
  }
};

const main = async (): Promise<void> => {
  initializeSentry();
  await initializeMsw();

  const container = document.getElementById('root');
  if (container == null) {
    return;
  }

  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster position="top-center" />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
