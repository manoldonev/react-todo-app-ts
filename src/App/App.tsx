import { lazy, Suspense } from 'react';
import { DataBrowserRouter, Navigate, Route } from 'react-router-dom';
import { ErrorPage } from './ErrorPage';
import { Layout, NotFound } from '../routes';
import { LoadingIndicator } from './LoadingIndicator';

const Tasks = lazy(async () => import('../routes/tasks').then((module) => ({ default: module.Tasks })));

const Analytics = lazy(async () => import('../routes/analytics').then((module) => ({ default: module.Analytics })));

const Settings = lazy(async () => import('../routes/settings').then((module) => ({ default: module.Settings })));

const App = (): JSX.Element => {
  // TODO: animated routes (no good story for v6 atm, see https://github.com/remix-run/react-router/issues/7117#issuecomment-949096628)
  return (
    <DataBrowserRouter basename={import.meta.env.BASE_URL}>
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Navigate to="tasks" />} />
        <Route
          path="tasks/*"
          element={
            <Suspense fallback={<LoadingIndicator className="text-primary" />}>
              <Tasks />
            </Suspense>
          }
        />
        <Route
          path="analytics"
          element={
            <Suspense fallback={<LoadingIndicator className="text-primary" />}>
              <Analytics />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<LoadingIndicator className="text-primary" />}>
              <Settings />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </DataBrowserRouter>
  );
};

export { App };
