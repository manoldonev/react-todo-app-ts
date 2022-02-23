import { ThemeToggle } from '../../components/ThemeToggle';

const Settings = (): JSX.Element => {
  return (
    <div className="min-h-screen p-4 transition-colors text-on-tertiary bg-tertiary">
      <div className="flex items-center gap-2 md:hidden">
        <span>Toggle theme:</span>
        <ThemeToggle />
      </div>
    </div>
  );
};

export { Settings };
