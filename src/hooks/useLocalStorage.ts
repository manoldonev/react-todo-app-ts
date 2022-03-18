import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, defaultValue: T): readonly [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = window.localStorage.getItem(key);
    return storedValue != null ? <T>JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};

export { useLocalStorage };
