import { Link } from 'react-router-dom';
import { Navigation } from '../Navigation';
import { SearchBox } from './SearchBox';

const Header = (): JSX.Element => {
  return (
    <header className="sticky top-0 z-10 bg-sky-700">
      <div className="flex items-center justify-between p-4">
        <div className="grid items-center w-full md:flex">
          <div className="flex justify-start col-start-1 row-start-1 md:mr-4">
            <Link to="/">
              <span className="text-xl font-semibold text-white">Todo App</span>
            </Link>
          </div>

          <form className="col-start-1 row-start-1 pointer-events-none md:w-1/2 md:mx-auto">
            <SearchBox />
          </form>
        </div>

        <Navigation />
      </div>
    </header>
  );
};

export { Header };
