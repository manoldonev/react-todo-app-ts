import { BellIcon, SwatchIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const ActionBar = ({ className = '', onDelete }: { className?: string; onDelete: () => void }): JSX.Element => {
  return (
    <div className={`flex justify-end gap-1 text-on-primary-container ${className}`}>
      <button type="button" className="group" disabled aria-label="Set Reminder">
        <BellIcon className="h-6 w-6 p-1 group-disabled:text-on-primary-container/25" />
      </button>
      <button type="button" className="group" disabled aria-label="Background Options">
        <SwatchIcon className="h-6 w-6 p-1 group-disabled:text-on-primary-container/25" />
      </button>
      <button type="button" className="group" disabled aria-label="Edit Item">
        <PencilSquareIcon className="h-6 w-6 p-1 group-disabled:text-on-primary-container/25" />
      </button>
      <button type="button" onClick={onDelete} aria-label="Delete Item">
        <TrashIcon className="h-6 w-6 rounded-xl p-1 hover:border hover:border-secondary hover:bg-secondary-container hover:text-on-secondary-container" />
      </button>
    </div>
  );
};

export { ActionBar };
