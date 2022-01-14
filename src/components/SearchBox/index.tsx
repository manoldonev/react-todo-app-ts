import { SearchIcon } from '@heroicons/react/outline';

const SearchBox = (): JSX.Element => {
  return (
    <div className="flex justify-end">
      <input
        id="search"
        type="search"
        placeholder="Search"
        className="z-10 w-0 h-12 text-lg duration-300 rounded-l-sm outline-none md:w-[calc(100%_-_3rem+_1px)] peer md:px-5 focus:px-5 focus:w-[calc(100%_-_3rem+_1px)] pointer-events-auto"
      />
      <label
        htmlFor="search"
        className="p-3 -ml-px bg-white rounded-sm pointer-events-auto select-none peer-focus:rounded-l-none md:rounded-l-none peer-focus:pointer-events-none"
      >
        <SearchIcon className="w-6 h-6 pointer-events-none" />
      </label>
    </div>
  );
};

export { SearchBox };
