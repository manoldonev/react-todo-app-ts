import { Route, Routes, useLocation } from 'react-router-dom';
import { NewTask, NewTaskModal } from '..';
import { Todos } from './Todos';
import { CtaButton } from './CtaButton';

const Tasks = (): JSX.Element => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | null | undefined;

  return (
    <>
      <Routes location={state?.backgroundLocation ?? location}>
        <Route
          path="/"
          element={
            <>
              <Todos />
              {/* TODO: FAB accessibility and/or keyboard hotkey */}
              <CtaButton className="fixed z-10 md:bottom-8 bottom-24 right-6" />
            </>
          }
        />
        <Route path="/new" element={<NewTask />} />
      </Routes>

      {/* open route in a modal dialog only if navigating from within /tasks */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/new" element={<NewTaskModal />} />
        </Routes>
      )}
    </>
  );
};

export { Tasks };
