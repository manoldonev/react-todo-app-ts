import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { ColorMode, useColorMode } from './hooks/useColorMode';

const ThemeToggle = ({ className = '' }: { className?: string }): JSX.Element => {
  const [colorMode, setColorMode] = useColorMode();
  const isDarkMode = colorMode === ColorMode.Dark;

  return (
    <button
      type="button"
      onClick={() => setColorMode(isDarkMode ? ColorMode.Light : ColorMode.Dark)}
      aria-label="Toggle Theme"
      className={`rounded-full p-2.5 text-sm text-on-primary/75 ring-0 hover:text-background ${className}`}
    >
      <SunIcon className={`${!isDarkMode ? 'hidden' : ''} h-5 w-5`} />
      <MoonIcon className={`${isDarkMode ? 'hidden' : ''} h-5 w-5`} />
    </button>
  );
};

export { ThemeToggle };
