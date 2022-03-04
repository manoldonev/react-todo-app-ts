import { useMediaQuery } from '@react-hook/media-query';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { useLocalStorage } from '../../../hooks';

enum ColorMode {
  Light = 'light',
  Dark = 'dark',
}

const useColorMode = (): readonly [ColorMode, Dispatch<SetStateAction<ColorMode>>] => {
  const isDarkModePreferred = useMediaQuery('(prefers-color-scheme: dark)');
  const [colorMode, setColorMode] = useLocalStorage<ColorMode>(
    'color-mode',
    isDarkModePreferred ? ColorMode.Dark : ColorMode.Light,
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (colorMode === ColorMode.Dark) {
      root.classList.add(ColorMode.Dark);
    } else {
      root.classList.remove(ColorMode.Dark);
    }
  }, [colorMode]);

  return [colorMode, setColorMode] as const;
};

export { useColorMode, ColorMode };
