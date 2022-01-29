import { useMediaQuery } from '@react-hook/media-query';
import { useRef, useState } from 'react';
import type { SwipeCallback, SwipeDirections, TapCallback } from 'react-swipeable';
import { useSwipeable, LEFT } from 'react-swipeable';
import { BackgroundLayer } from './BackgroundLayer';
import { ForegroundLayer } from './ForegroundLayer';

// TODO: consider twin.macro for this component?
const SwipeToAction = ({
  children,
  backgroundChildren,
  threshold = 0.3,
  onSwiped,
  onTap,
  backgroundClassName: bgClassName,
  foregroundClassName: fgClassName,
}: {
  children: React.ReactNode;
  backgroundChildren: React.ReactNode;
  threshold?: number;
  onSwiped?: SwipeCallback;
  onTap?: TapCallback;
  backgroundClassName?: string;
  foregroundClassName?: string;
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

        if (onSwiped) {
          onSwiped(eventData);
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

  const isTouchEnabled = useMediaQuery('(pointer: coarse)');
  if (!isTouchEnabled) {
    return <div className={`w-full h-full ${fgClassName ?? ''}`}>{children}</div>;
  }

  return (
    <div className="relative w-full overflow-hidden">
      <BackgroundLayer ref={backgroundRef} className={bgClassName} swipeDirection={swipeDirection}>
        {backgroundChildren}
      </BackgroundLayer>
      {/* eslint-disable-next-line @typescript-eslint/unbound-method */}
      <ForegroundLayer ref={refPassthrough} className={fgClassName} onMouseDown={swipeableHandlers.onMouseDown}>
        {children}
      </ForegroundLayer>
    </div>
  );
};

export { SwipeToAction };
