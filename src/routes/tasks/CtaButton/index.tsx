import { PlusIcon } from '@heroicons/react/outline';
import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHeadroom } from '../../../components/Headroom';

const CtaButton = ({ className = '' }: { className?: string }): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useHeadroom(buttonRef, {
    headroomOptions: {
      classes: {
        initial: 'transition-transform duration-300 will-change-transform',
        pinned: 'translate-x-0',
        unpinned: 'translate-x-[5rem]',
      },
    },
  });

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label="Add new item"
      onClick={() => navigate('/tasks/new', { state: { backgroundLocation: location } })}
      className={`text-on-secondary transition duration-200 ease-in bg-secondary rounded-full shadow w-14 h-14 hover:bg-on-secondary-container active:shadow-lg focus:outline-none ${className}`}
    >
      <PlusIcon />
    </button>
  );
};

export { CtaButton };
