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
      data-testid="cta-button"
      ref={buttonRef}
      type="button"
      aria-label="Add new item"
      onClick={() => navigate('/tasks/new', { state: { backgroundLocation: location } })}
      className={`h-14 w-14 rounded-full bg-secondary text-on-secondary shadow transition duration-200 ease-in hover:bg-secondary-variant focus:outline-none active:shadow-lg ${className}`}
    >
      <PlusIcon className="h-5 w-full" />
    </button>
  );
};

export { CtaButton };
