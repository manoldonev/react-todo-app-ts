import { BellIcon, ColorSwatchIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';

const ActionBar = ({ className = '', onDelete }: { className?: string; onDelete: () => void }): JSX.Element => {
  return (
    <div className={`flex gap-1 justify-end text-on-primary-container ${className}`}>
      <button type="button" className="group" disabled aria-label="Set Reminder">
        <BellIcon className="w-6 h-6 p-1 group-disabled:text-on-primary-container/25" />
      </button>
      <button type="button" className="group" disabled aria-label="Background Options">
        <ColorSwatchIcon className="w-6 h-6 p-1 group-disabled:text-on-primary-container/25" />
      </button>
      <button type="button" className="group" disabled aria-label="Edit Item">
        <PencilAltIcon className="w-6 h-6 p-1 group-disabled:text-on-primary-container/25" />
      </button>
      <button type="button" onClick={onDelete} aria-label="Delete Item">
        <TrashIcon className="w-6 h-6 p-1 hover:border hover:border-secondary rounded-xl hover:bg-secondary-container hover:text-on-secondary-container" />
      </button>
    </div>
  );
};

export { ActionBar };
