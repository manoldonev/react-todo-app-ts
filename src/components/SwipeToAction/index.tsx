import { useRef, useState } from 'react';
import type { SwipeCallback, SwipeDirections, TapCallback } from 'react-swipeable';
import { useSwipeable, LEFT, RIGHT } from 'react-swipeable';
import { BackgroundLayer } from './BackgroundLayer';
import { ForegroundLayer } from './ForegroundLayer';

// TODO: consider twin.macro for this component?
const SwipeToAction = ({
  children,
  leftChildren,
  rightChildren,
  threshold = 0.3,
  onSwipedLeft,
  onSwipedRight,
  onTap,
  leftChildrenClassName,
  rightChildrenClassName,
  className,
}: {
  children: React.ReactNode;
  leftChildren: React.ReactNode;
  rightChildren: React.ReactNode;
  threshold?: number;
  onSwipedLeft?: SwipeCallback;
  onSwipedRight?: SwipeCallback;
  onTap?: TapCallback;
  leftChildrenClassName?: string;
  rightChildrenClassName?: string;
  className?: string;
}): JSX.Element => {
  const foregroundRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirections>(LEFT);

  const swipeableHandlers = useSwipeable({
    // if tracking mouse see https://github.com/FormidableLabs/react-swipeable/issues/231 for a workaround
    trackMouse: false,
    onTap,
    onSwipeStart: () => {
      if (foregroundRef.current) {
        foregroundRef.current.style.transition = '';
        foregroundRef.current.style.transform = '';
      }
    },
    onSwiping: (eventData) => {
      if (foregroundRef.current) {
        const transform = `translateX(${eventData.deltaX}px)`;
        foregroundRef.current.style.transform = transform;
      }

      if (backgroundRef.current) {
        const opacity = Math.min(Math.abs(eventData.deltaX) / 100, 1);
        backgroundRef.current.style.opacity = opacity.toFixed(2);
      }

      setSwipeDirection(eventData.dir);
    },
    onSwiped: (eventData) => {
      if (!foregroundRef.current) {
        return;
      }

      let left = eventData.deltaX;
      const { offsetWidth } = foregroundRef.current;
      if (Math.abs(left) >= offsetWidth * threshold) {
        left = eventData.dir === LEFT ? -offsetWidth * 2 : offsetWidth;

        if (eventData.dir === LEFT && onSwipedLeft) {
          onSwipedLeft(eventData);
        } else if (eventData.dir === RIGHT && onSwipedRight) {
          onSwipedRight(eventData);
        }
      } else {
        left = 0;
      }

      foregroundRef.current.style.transition = 'transform 0.5s ease-out';
      foregroundRef.current.style.transform = `translateX(${left}px)`;
    },
  });

  const refPassthrough = (element: HTMLDivElement): void => {
    swipeableHandlers.ref(element);
    foregroundRef.current = element;
  };

  return (
    <div className="relative w-full overflow-hidden">
      <BackgroundLayer
        ref={backgroundRef}
        className={swipeDirection === LEFT ? rightChildrenClassName : leftChildrenClassName}
        swipeDirection={swipeDirection}
      >
        {swipeDirection === LEFT ? rightChildren : leftChildren}
      </BackgroundLayer>
      {/* eslint-disable-next-line @typescript-eslint/unbound-method */}
      <ForegroundLayer ref={refPassthrough} className={className} onMouseDown={swipeableHandlers.onMouseDown}>
        {children}
      </ForegroundLayer>
    </div>
  );
};

export { SwipeToAction };
