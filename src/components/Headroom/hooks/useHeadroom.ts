/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
import Headroom from 'headroom.js';
import type { HeadroomOptions } from 'headroom.js';
import type { MutableRefObject } from 'react';
import { useEffect } from 'react';

// TODO: consider exposing additional Headroom / Legroom components
const useHeadroom = (
  rootRef: MutableRefObject<HTMLElement | null>,
  { headroomOptions, autoCalculateOffset = false }: { headroomOptions: HeadroomOptions; autoCalculateOffset?: boolean },
): void => {
  useEffect(() => {
    if (rootRef.current == null) {
      return;
    }

    // TODO: override @types/headroom.js declaration to accept { up; down; } offset value
    const options = autoCalculateOffset
      ? { ...headroomOptions, offset: { up: 0, down: rootRef.current.offsetHeight } }
      : headroomOptions;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const headroom = new Headroom(rootRef.current, <any>options);
    headroom.init();

    // HACK: init/destroy race condition
    // see https://github.com/WickyNilliams/headroom.js/issues/367
    const unsafeHeadroom = <any>headroom;
    if (unsafeHeadroom.scrollTracker == null) {
      unsafeHeadroom.scrollTracker = {
        destroy: () => {},
      };
    }

    // eslint-disable-next-line consistent-return
    return () => headroom.destroy();
  }, [rootRef, headroomOptions, autoCalculateOffset]);
};

export { useHeadroom };
/* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
