/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
import Headroom from 'headroom.js';
import type { HeadroomOptions } from 'headroom.js';
import type { MutableRefObject } from 'react';
import { useEffect } from 'react';

// TODO: needs a rewrite (remove headroom.js dependency & hacks)
const useHeadroom = (
  rootRef: MutableRefObject<HTMLElement | null>,
  {
    headroomOptions,
    autoCalculateOffset = false,
    disableInitialTransitionToUnpinned = false,
  }: { headroomOptions: HeadroomOptions; autoCalculateOffset?: boolean; disableInitialTransitionToUnpinned?: boolean },
): void => {
  useEffect(() => {
    if (rootRef.current == null) {
      return;
    }

    const options = autoCalculateOffset
      ? { ...headroomOptions, offset: { up: 0, down: rootRef.current.offsetHeight } }
      : headroomOptions;

    /* HACK: Do not add CSS transitions until after we are done with the initial negative transform when transitioning from 'unfixed' to 'unpinned'; otherwise the header flashes into view temporarily while transitioning from 0 to -100% */
    if (disableInitialTransitionToUnpinned) {
      const userUnpinnedClassName = options.classes?.unpinned;
      const userOnTop = options.onTop;
      options.onTop = function onTop(this) {
        (this as any).classes.unpinned = `transition-none ${userUnpinnedClassName?.replace('fixed', '').trim() ?? ''}`;

        if (userOnTop) {
          userOnTop.call(this);
        }
      };

      const userOnPin = options.onPin;
      options.onPin = function onPin(this) {
        (this as any).classes.unpinned = `${userUnpinnedClassName ?? ''}`;

        if (userOnPin) {
          userOnPin.call(this);
        }
      };
    }

    // TODO: remove <any> cast once https://github.com/DefinitelyTyped/DefinitelyTyped/pull/58637 is merged
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const headroom = new Headroom(rootRef.current, <any>options);
    headroom.init();

    // HACK: init/destroy race condition upon test execution
    // see https://github.com/WickyNilliams/headroom.js/issues/367
    const unsafeHeadroom = <any>headroom;
    if (unsafeHeadroom.scrollTracker == null) {
      unsafeHeadroom.scrollTracker = {
        destroy: () => {},
      };
    }

    // eslint-disable-next-line consistent-return
    return () => headroom.destroy();
  }, [rootRef, headroomOptions, autoCalculateOffset, disableInitialTransitionToUnpinned]);
};

export { useHeadroom };
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
