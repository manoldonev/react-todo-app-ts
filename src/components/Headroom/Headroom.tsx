import { useRef } from 'react';
import { useHeadroom } from './hooks/useHeadroom';

const Headroom = ({ children, className = '' }: { children: React.ReactNode; className?: string }): JSX.Element => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useHeadroom(wrapperRef, {
    headroomOptions: {
      classes: {
        initial: 'transition-transform duration-300 will-change-transform',
        pinned: 'sticky top-0 translate-y-0',
        unpinned: 'fixed -translate-y-full',
        top: '!relative',
      },
    },
    autoCalculateOffset: true,
    disableInitialTransitionToUnpinned: true,
  });

  return (
    <div className={className} ref={wrapperRef}>
      {children}
    </div>
  );
};

export { Headroom };
