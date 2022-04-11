import { Link, useLocation, useNavigate } from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import type { ChangeEvent } from 'react';
import { Navigation } from '../Navigation';
import { SearchBox } from '../../../components/SearchBox';
import { ThemeToggle } from '../../../components/ThemeToggle';

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
    <header className="w-screen bg-primary transition-colors">
      <div className="flex items-center justify-between p-4">
        <div className="grid w-full items-center md:flex">
          <div className="col-start-1 row-start-1 flex justify-start md:mr-4">
            <Link to="/">
              <h1 className="text-on-primary">Todo App</h1>
            </Link>
          </div>

          <form role="search" className="pointer-events-none col-start-1 row-start-1 md:mx-auto md:w-1/2">
            <SearchBox value={query} onChange={handleChange} />
          </form>
        </div>

        <Navigation className="hidden md:flex" />

        <ThemeToggle className="hidden md:block" />
      </div>
    </header>
  );
};

export { Header };
