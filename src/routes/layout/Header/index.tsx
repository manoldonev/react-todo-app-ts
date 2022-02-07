import { Link, useLocation, useNavigate } from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import type { ChangeEvent } from 'react';
import { Navigation } from '../Navigation';
import { SearchBox } from '../../../components/SearchBox';

export const queryAtom = atom('');

const Header = (): JSX.Element => {
  const [query, setQuery] = useAtom(queryAtom);
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (location.pathname !== '/tasks') {
      navigate('/tasks');
    }
    setQuery(e.target.value);
  };

  return (
    <header className="w-screen bg-sky-700">
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
