import { useEffect, useState } from 'react';

/* SSR & rehydration helper hook, see https://www.joshwcomeau.com/react/the-perils-of-rehydration/
  useEffect only fires after the component has mounted (does not fire in server-side environment); 
  while the React app adopts the DOM during rehydration, useEffect hasn't been called yet, so it 
  will meet React's expectation (that DOM structure will match) */
const useHasMounted = (): boolean => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export { useHasMounted };
