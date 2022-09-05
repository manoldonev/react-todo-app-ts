import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
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
        className="peer pointer-events-auto z-10 h-12 w-0 rounded-l-sm bg-primary-container text-lg text-on-primary-container placeholder-on-primary-container/75 outline-none duration-300 focus:w-[calc(100%_-_3rem+_1px)] focus:px-5 md:w-[calc(100%_-_3rem+_1px)] md:px-5"
      />
      <label
        htmlFor="search"
        aria-label="Search"
        className="pointer-events-auto -ml-px select-none rounded-sm bg-primary-container p-3 text-on-primary-container peer-focus:pointer-events-none peer-focus:rounded-l-none md:rounded-l-none"
      >
        <MagnifyingGlassIcon className="pointer-events-none h-6 w-6 text-on-primary-container" />
      </label>
    </div>
  );
};

export { SearchBox };
