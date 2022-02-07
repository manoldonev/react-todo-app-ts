import { useRef } from 'react';
import { useHeadroom } from './hooks/useHeadroom';

const Legroom = ({ children, className = '' }: { children: React.ReactNode; className?: string }): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useHeadroom(wrapperRef, {
    headroomOptions: {
      classes: {
        initial: 'fixed inset-x-0 bottom-0 transition-transform duration-300 will-change-transform',
        pinned: 'translate-y-0',
        unpinned: 'translate-y-full',
      },
    },
  });

  return (
    <div className={className} ref={wrapperRef}>
      {children}
    </div>
  );
};

export { Legroom };
