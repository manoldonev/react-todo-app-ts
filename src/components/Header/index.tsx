import { SearchBox } from '../SearchBox';

const Header = (): JSX.Element => {
  return (
    <header className="sticky top-0 z-10 bg-sky-700">
      <div className="flex items-center justify-between p-4">
        <div className="grid items-center w-full md:flex">
          <div className="flex justify-start col-start-1 row-start-1 md:mr-4">
            <a href="/">
              <span className="text-xl font-semibold text-white ">Todo App</span>
            </a>
          </div>

          <form className="col-start-1 row-start-1 pointer-events-none md:w-1/2 md:mx-auto">
            <SearchBox />
          </form>
        </div>

        <nav className="flex md:items-center md:w-auto">
          <div className="hidden md:flex">
            <a className="block mr-4 md:text-white" href="/tasks">
              Tasks
            </a>
            <a className="block mr-4 md:text-white" href="/analytics">
              Analytics
            </a>
            <a className="block mr-4 md:text-white" href="/settings">
              Settings
            </a>
          </div>
          {/* <div className="flex text-sm">
            <a
              className="p-2 ml-2 font-semibold leading-none bg-white border border-gray-100 rounded text-sky-500 hover:border-transparent hover:bg-gray-100"
              href="/login"
            >
              Login
            </a>
            <a
              className="p-2 ml-2 font-semibold leading-none text-gray-100 border rounded border-sky-600 bg-sky-500 hover:border-transparent hover:bg-sky-400"
              href="/login"
            >
              Sign up
            </a>
          </div> */}
        </nav>
      </div>
    </header>
  );
};

export { Header };
