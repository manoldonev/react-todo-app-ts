import { SearchIcon } from '@heroicons/react/outline';

const Header = (): JSX.Element => {
  return (
    <>
      <h1 className="p-2 font-mono text-center text-white l-0 bg-sky-700">Todo App</h1>
      <div className="sticky top-0 z-10 flex justify-center bg-sky-700">
        <div className="relative w-full xs:w-2/3 lg:w-1/2 my-3 mx-1.5">
          <input
            className="w-full h-12 px-5 pr-16 text-lg text-black transition border-2 rounded-md focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
          />
          <button type="submit" className="absolute mr-4 right-2 top-3">
            <SearchIcon className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </>
  );
};

export { Header };
