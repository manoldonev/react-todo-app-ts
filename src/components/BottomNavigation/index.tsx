import { ClipboardListIcon, ChartSquareBarIcon, AdjustmentsIcon } from '@heroicons/react/outline';

const BottomNavigation = (): JSX.Element => {
  return (
    <nav className="fixed inset-x-0 bottom-0 flex justify-between text-xs text-blue-900 bg-blue-100 md:hidden">
      <button
        type="button"
        className="w-full p-3 text-center transition duration-300 hover:bg-blue-200 hover:text-blue-800"
      >
        <ClipboardListIcon className="w-6 h-6 mx-auto mb-1" />
        Tasks
      </button>
      <button
        type="button"
        className="w-full p-3 text-center transition duration-300 hover:bg-blue-200 hover:text-blue-800"
      >
        <ChartSquareBarIcon className="w-6 h-6 mx-auto mb-1" />
        Analytics
      </button>
      <button
        type="button"
        className="w-full p-3 text-center transition duration-300 hover:bg-blue-200 hover:text-blue-800"
      >
        <AdjustmentsIcon className="w-6 h-6 mx-auto mb-1" />
        Settings
      </button>
    </nav>
  );
};

export { BottomNavigation };
