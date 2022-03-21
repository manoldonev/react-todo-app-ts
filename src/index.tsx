import React from 'react';
import ReactDOM from 'react-dom';
import '@reach/dialog/styles.css';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Toaster } from 'react-hot-toast';
import { App } from './App';
import { queryClient } from './queryClient';
import { reportWebVitals } from './reportWebVitals';

const main = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mocks/msw/browser');
    await worker.start({
      serviceWorker: {
        url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
      },
    });
  }

  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <QueryClientProvider client={queryClient}>
          <App />
          <Toaster position="top-center" />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
