import { PlusIcon } from '@heroicons/react/outline';

const CtaButton = ({ className }: { className?: string }): JSX.Element => {
  return (
    <button
      type="button"
      className={`text-white transition duration-200 ease-in bg-blue-500 rounded-full shadow w-14 h-14 hover:bg-blue-700 active:shadow-lg focus:outline-none ${
        className ?? ''
      }`}
    >
      <PlusIcon />
    </button>
  );
};

export { CtaButton };
