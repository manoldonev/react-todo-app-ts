import React, { useRef } from 'react';
import { useHeadroom } from './hooks/useHeadroom';

const Headroom = ({ children }: { children: React.ReactElement }): JSX.Element => {
  const rootRef = useRef<HTMLElement | null>(null);

  useHeadroom(rootRef, {
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

  const childElement = React.Children.only(children);

  return React.cloneElement(childElement, { ref: rootRef });
};

export { Headroom };
