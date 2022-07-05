import Masonry from 'masonry-layout';
import { useCallback, useEffect, useRef } from 'react';
import useMutationObserver from '@rooks/use-mutation-observer';

const mutationObserverOptions: MutationObserverInit = { childList: true };

const MasonryComponent = ({
  children,
  className = '',
  options,
  as: Component = 'div',
}: {
  className?: string;
  children: React.ReactNode;
  options?: Masonry.Options;
  as?: React.ElementType;
}): JSX.Element => {
  const masonry = useRef<Masonry | null>(null);
  const containerRef = useRef<HTMLUListElement | null>(null);

  const diffDomChildren = (
    mutations: MutationRecord[],
  ): {
    prepended: Element[];
    appended: Element[];
    removed: Element[];
    shouldReloadItems: boolean;
  } => {
    let shouldReloadItems = false;

    // we know the generic NodeList actually contains Element nodes as we are using the "childList" strategy for the DOM mutation observer
    const prepended: Element[] = [];
    const appended: Element[] = [];
    const removed: Element[] = [];
    mutations.forEach((mutation) => {
      // NOTE: we assume nodes are either prepended, or appended -- no inserts
      if (mutation.addedNodes.length > 0) {
        if (mutation.previousSibling == null) {
          prepended.push(...([...mutation.addedNodes] as Element[]));
        } else {
          // assume everything else is appended
          appended.push(...([...mutation.addedNodes] as Element[]));
        }
      } else if (mutation.removedNodes.length > 0) {
        removed.push(...([...mutation.removedNodes] as Element[]));

        // force items reload to notify Masonry of removed items if removing any other item(s) but the last one(s)
        if (mutation.nextSibling != null) {
          shouldReloadItems = true;
        }
      }

      return true;
    });

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    shouldReloadItems = shouldReloadItems || prepended.length > 0;

    return {
      prepended,
      appended,
      removed,
      shouldReloadItems,
    };
  };

  const performLayout = useCallback((mutations: MutationRecord[]): void => {
    if (masonry.current == null) {
      return;
    }

    const { prepended, appended, shouldReloadItems } = diffDomChildren(mutations);

    if (appended.length > 0) {
      masonry.current.appended?.(appended);
    }

    if (prepended.length > 0) {
      masonry.current.prepended?.(prepended);
    }

    if (shouldReloadItems) {
      masonry.current.reloadItems?.();
    }

    masonry.current.layout?.();
  }, []);

  useEffect(() => {
    if (containerRef.current != null) {
      masonry.current = new Masonry(containerRef.current, options);
    }

    return () => masonry.current?.destroy?.();
  }, [options]);

  useMutationObserver(containerRef, performLayout, mutationObserverOptions);

  return (
    <Component className={className} ref={containerRef}>
      {children}
    </Component>
  );
};

export { MasonryComponent as Masonry };
