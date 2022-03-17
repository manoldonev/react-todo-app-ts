const setupIntersectionObserverMock = ({
  root = null,
  rootMargin = '',
  thresholds = [],
  disconnect = () => null,
  observe = () => null,
  takeRecords = () => [],
  unobserve = () => null,
} = {}): void => {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = root;

    readonly rootMargin: string = rootMargin;

    readonly thresholds: readonly number[] = thresholds;

    disconnect: () => void = disconnect;

    observe: (target: Element) => void = observe;

    takeRecords: () => IntersectionObserverEntry[] = takeRecords;

    unobserve: (target: Element) => void = unobserve;
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
};

const setupWindowScrollToMock = (): void => {
  Object.defineProperty(window, 'scrollTo', {
    value: (_x: number, y: number) => {
      document.documentElement.scrollTop = y;
    },
    writable: true,
  });
};

export { setupIntersectionObserverMock, setupWindowScrollToMock };
