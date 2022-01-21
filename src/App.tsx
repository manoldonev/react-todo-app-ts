import { Navigate, Route, Routes } from 'react-router-dom';
import { Analytics, Layout, NotFound, Settings, Tasks } from './routes';

const App = (): JSX.Element => {
  // TODO: animated routes (no good story for v6 atm, see https://github.com/remix-run/react-router/issues/7117#issuecomment-949096628)
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Tasks />} />
        <Route path="tasks" element={<Navigate to="/" />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export { App };
