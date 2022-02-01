import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Analytics, Layout, NewTask, NewTaskModal, NotFound, Settings, Tasks } from '../routes';
import { useScrollToTop } from './useScrollToTop';

const App = (): JSX.Element => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | null | undefined;

  useScrollToTop();

  // TODO: animated routes (no good story for v6 atm, see https://github.com/remix-run/react-router/issues/7117#issuecomment-949096628)
  return (
    <>
      <Routes location={state?.backgroundLocation ?? location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="tasks" />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/new" element={<NewTask />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {/* open route in a modal dialog only if navigating from /tasks */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/tasks/new" element={<NewTaskModal />} />
        </Routes>
      )}
    </>
  );
};

export { App };
