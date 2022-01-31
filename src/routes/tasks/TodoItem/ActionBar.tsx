import { BellIcon, ColorSwatchIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline';

const ActionBar = ({ className = '', onDelete }: { className?: string; onDelete: () => void }): JSX.Element => {
  return (
    <div className={`flex gap-1 justify-end ${className}`}>
      <button type="button" className="group" disabled>
        <BellIcon className="w-6 h-6 p-1 group-disabled:text-slate-300 enabled:hover:border enabled:hover:border-gray-400 rounded-xl enabled:hover:bg-slate-300" />
      </button>
      <button type="button" className="group" disabled>
        <ColorSwatchIcon className="w-6 h-6 p-1 group-disabled:text-slate-300 enabled:hover:border enabled:hover:border-gray-400 rounded-xl enabled:hover:bg-slate-300" />
      </button>
      <button type="button" className="group" disabled>
        <PencilAltIcon className="w-6 h-6 p-1 group-disabled:text-slate-300 enabled:hover:border enabled:hover:border-gray-400 rounded-xl enabled:hover:bg-slate-300" />
      </button>
      <button type="button" onClick={onDelete}>
        <TrashIcon className="w-6 h-6 p-1 hover:border hover:border-gray-400 rounded-xl hover:bg-slate-300" />
      </button>
    </div>
  );
};

export { ActionBar };
