import { atom, useAtom } from 'jotai';
import { SearchIcon } from '@heroicons/react/outline';

export const queryAtom = atom('');

const SearchBox = (): JSX.Element => {
  const [query, setQuery] = useAtom(queryAtom);

  return (
    <div className="flex justify-end">
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        className="z-10 w-0 h-12 text-lg duration-300 rounded-l-sm outline-none md:w-[calc(100%_-_3rem+_1px)] peer md:px-5 focus:px-5 focus:w-[calc(100%_-_3rem+_1px)] pointer-events-auto bg-white"
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
