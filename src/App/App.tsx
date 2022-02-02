import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout, NotFound } from '../routes';
import { LoadingIndicator } from './LoadingIndicator';
import { useScrollToTop } from './useScrollToTop';

const Tasks = lazy(async () => import('../routes/tasks').then((module) => ({ default: module.Tasks })));

const Analytics = lazy(async () => import('../routes/analytics').then((module) => ({ default: module.Analytics })));

const Settings = lazy(async () => import('../routes/settings').then((module) => ({ default: module.Settings })));

const App = (): JSX.Element => {
  useScrollToTop();

  // TODO: animated routes (no good story for v6 atm, see https://github.com/remix-run/react-router/issues/7117#issuecomment-949096628)
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="tasks" />} />
          <Route path="tasks/*" element={<Tasks />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export { App };
