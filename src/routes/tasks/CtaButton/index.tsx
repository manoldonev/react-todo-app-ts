import { PlusIcon } from '@heroicons/react/outline';
import { useLocation, useNavigate } from 'react-router-dom';

const CtaButton = ({ className = '' }: { className?: string }): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label="Add new item"
      onClick={() => navigate('/tasks/new', { state: { backgroundLocation: location } })}
      className={`text-white transition duration-200 ease-in bg-blue-500 rounded-full shadow w-14 h-14 hover:bg-blue-700 active:shadow-lg focus:outline-none ${className}`}
    >
      <PlusIcon />
    </button>
  );
};

export { CtaButton };
