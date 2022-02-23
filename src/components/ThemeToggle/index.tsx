import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { ColorMode, useColorMode } from './useColorMode';

const ThemeToggle = ({ className = '' }: { className?: string }): JSX.Element => {
  const [colorMode, setColorMode] = useColorMode();
  const isDarkMode = colorMode === ColorMode.Dark;

  return (
    <button
      type="button"
      onClick={() => setColorMode(isDarkMode ? ColorMode.Light : ColorMode.Dark)}
      aria-label="Toggle Theme"
      className={`text-on-primary/75 ring-0 hover:text-background rounded-full text-sm p-2.5 ${className}`}
    >
      <SunIcon className={`${!isDarkMode ? 'hidden' : ''} w-5 h-5`} />
      <MoonIcon className={`${isDarkMode ? 'hidden' : ''} w-5 h-5`} />
    </button>
  );
};

export { ThemeToggle };
