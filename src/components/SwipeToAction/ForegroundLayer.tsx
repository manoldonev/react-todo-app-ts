import type { MouseEventHandler } from 'react';
import { forwardRef } from 'react';

const ForegroundLayer = forwardRef<
  HTMLDivElement,
  {
    children: React.ReactNode;
    className: string | undefined;
    onMouseDown: MouseEventHandler<HTMLDivElement> | undefined;
  }
>(({ children, className, onMouseDown }, ref) => {
  return (
    <div
      // eslint-disable-next-line @typescript-eslint/unbound-method
      onMouseDown={onMouseDown}
      ref={ref}
      role="none"
      className={`touch-pan-y relative w-full h-full ${className ?? ''}`}
    >
      {children}
    </div>
  );
});

export { ForegroundLayer };
