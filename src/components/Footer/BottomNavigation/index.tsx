import { AdjustmentsIcon, ChartSquareBarIcon, ClipboardListIcon } from '@heroicons/react/outline';

const BottomNavigation = ({ className }: { className?: string }): JSX.Element => {
  return (
    <nav className={`flex justify-between text-xs text-blue-900 bg-blue-100 md:hidden ${className ?? ''}`}>
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
