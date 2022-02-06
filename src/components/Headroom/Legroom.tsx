import React, { useRef } from 'react';
import { useHeadroom } from './hooks/useHeadroom';

const Legroom = ({ children }: { children: React.ReactElement }): JSX.Element => {
  const rootRef = useRef<HTMLElement | null>(null);

  useHeadroom(rootRef, {
    headroomOptions: {
      classes: {
        initial: 'fixed inset-x-0 bottom-0 transition-transform duration-300 will-change-transform',
        pinned: 'translate-y-0',
        unpinned: 'translate-y-full',
      },
    },
  });

  const childElement = React.Children.only(children);

  return React.cloneElement(childElement, { ref: rootRef });
};

export { Legroom };
