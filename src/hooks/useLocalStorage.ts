import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useHasMounted } from './useHasMounted';

const useLocalStorage = <T>(key: string, defaultValue: T): readonly [T, Dispatch<SetStateAction<T>>] => {
  const hasMounted = useHasMounted();
  const [value, setValue] = useState<T>(() => {
    if (!hasMounted) {
      return defaultValue;
    }

    const storedValue = window.localStorage.getItem(key);
    return storedValue != null ? <T>JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export { useLocalStorage };
