import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorFallback';
import { Layout, NotFound } from '../routes';
import { useScrollToTop } from './useScrollToTop';
import { LoadingIndicator } from './LoadingIndicator';

const Tasks = lazy(async () => import('../routes/tasks').then((module) => ({ default: module.Tasks })));

const Analytics = lazy(async () => import('../routes/analytics').then((module) => ({ default: module.Analytics })));

const Settings = lazy(async () => import('../routes/settings').then((module) => ({ default: module.Settings })));

const App = (): JSX.Element => {
  useScrollToTop();

  // TODO: animated routes (no good story for v6 atm, see https://github.com/remix-run/react-router/issues/7117#issuecomment-949096628)
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="tasks" />} />
          <Route
            path="tasks/*"
            element={
              <Suspense fallback={<LoadingIndicator />}>
                <Tasks />
              </Suspense>
            }
          />
          <Route
            path="analytics"
            element={
              <Suspense fallback={<LoadingIndicator />}>
                <Analytics />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<LoadingIndicator />}>
                <Settings />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
};

export { App };
