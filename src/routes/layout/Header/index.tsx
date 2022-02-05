import { Link, useLocation, useNavigate } from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import type { ChangeEvent } from 'react';
import { useRef } from 'react';
import { Navigation } from '../Navigation';
import { SearchBox } from '../../../components/SearchBox';
import { useHeadroom } from '../../../hooks/useHeadroom';

export const queryAtom = atom('');

const Header = (): JSX.Element => {
  const [query, setQuery] = useAtom(queryAtom);
  const location = useLocation();
  const navigate = useNavigate();

  const rootRef = useRef<HTMLElement | null>(null);
  // TODO: 'unpinned' does not animate (negative translate transform)
  useHeadroom(rootRef, {
    headroomOptions: {
      classes: {
        initial: 'transition-transform duration-300 will-change-transform',
        pinned: 'sticky top-0 translate-y-0',
        unpinned: '-translate-y-full',
        top: '!relative',
      },
    },
    autoCalculateOffset: true,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (location.pathname !== '/tasks') {
      navigate('/tasks');
    }
    setQuery(e.target.value);
  };

  return (
    <header ref={rootRef} className="z-10 w-screen bg-sky-700">
      <div className="flex items-center justify-between p-4">
        <div className="grid items-center w-full md:flex">
          <div className="flex justify-start col-start-1 row-start-1 md:mr-4">
            <Link to="/">
              <span className="text-xl font-semibold text-white">Todo App</span>
            </Link>
          </div>

          <form className="col-start-1 row-start-1 pointer-events-none md:w-1/2 md:mx-auto">
            <SearchBox value={query} onChange={handleChange} />
          </form>
        </div>

        <Navigation />
      </div>
    </header>
  );
};

export { Header };
