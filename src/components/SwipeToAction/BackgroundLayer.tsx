import { forwardRef } from 'react';
import type { SwipeDirections } from 'react-swipeable';
import { LEFT } from 'react-swipeable';

const BackgroundLayer = forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className: string | undefined; swipeDirection: SwipeDirections }
>(({ children, className, swipeDirection }, ref) => {
  return (
    <div
      ref={ref}
      className={`absolute flex h-full w-full items-center px-6 ${
        swipeDirection === LEFT ? 'justify-end' : 'justify-start'
      } ${className ?? ''}`}
    >
      {children}
    </div>
  );
});

export { BackgroundLayer };
