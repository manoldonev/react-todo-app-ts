import { SearchIcon } from '@heroicons/react/outline';

const Header = (): JSX.Element => {
  return (
    <header className="sticky top-0 z-10 bg-sky-700">
      <div className="flex items-center justify-between p-4 md:flex">
        <a className="absolute flex-none md:relative md:mr-4" href="/">
          <span className="text-xl font-semibold text-white ">Todo App</span>
        </a>

        <div className="w-full pointer-events-none md:w-1/2 md:mx-auto">
          <form className="relative">
            <div className="flex justify-end h-12 pointer-events-auto">
              <input
                id="search"
                type="search"
                placeholder="Search"
                className="absolute z-10 w-0 h-full text-lg duration-300 rounded-l-sm outline-none md:w-[calc(100%_-_3rem)] peer md:px-5 focus:px-5 focus:w-[calc(100%_-_3rem)] right-12"
              />
              <label
                htmlFor="search"
                className="absolute inline-block w-12 h-12 bg-white rounded-sm select-none active:transition-none peer-focus:rounded-r-sm peer-focus:rounded-l-none md:rounded-l-none md:rounded-r-sm"
              >
                <div className="flex items-center justify-center w-full h-full">
                  <SearchIcon className="w-6 h-6 pointer-events-none active:pl-4" />
                </div>
              </label>
            </div>
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
