import React, { useRef } from 'react';
import { useHeadroom } from './hooks/useHeadroom';

const Headroom = ({ children }: { children: React.ReactElement }): JSX.Element => {
  const rootRef = useRef<HTMLElement | null>(null);

  // TODO: 'unpinned' does not animate (negative translate transform)
  useHeadroom(rootRef, {
    headroomOptions: {
      classes: {
        initial: 'transition-transform duration-300 will-change-transform',
        pinned: 'sticky top-0 translate-y-0',
        unpinned: '-translate-y-full',
        top: '!relative',
      },
    },
    autoCalculateOffset: true,
  });

  const childElement = React.Children.only(children);

  return React.cloneElement(childElement, { ref: rootRef });
};

export { Headroom };
