import { SearchIcon } from '@heroicons/react/outline';
import type { ChangeEvent } from 'react';

const SearchBox = ({
  value,
  onChange,
}: {
  value?: string | number | readonly string[] | undefined;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element => {
  return (
    <div className="flex justify-end">
      <input
        id="search"
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="z-10 w-0 h-12 text-lg duration-300 rounded-l-sm outline-none md:w-[calc(100%_-_3rem+_1px)] peer md:px-5 focus:px-5 focus:w-[calc(100%_-_3rem+_1px)] pointer-events-auto bg-primary-container  text-on-primary-container placeholder-on-primary-container/75"
      />
      <label
        htmlFor="search"
        aria-label="Search"
        className="p-3 -ml-px rounded-sm pointer-events-auto select-none bg-primary-container peer-focus:rounded-l-none md:rounded-l-none peer-focus:pointer-events-none text-on-primary-container"
      >
        <SearchIcon className="w-6 h-6 pointer-events-none text-on-primary-container" />
      </label>
    </div>
  );
};

export { SearchBox };
