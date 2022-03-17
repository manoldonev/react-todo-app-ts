import { ThemeToggle } from '../../components/ThemeToggle';

const Settings = (): JSX.Element => {
  return (
    <div data-testid="settings" className="min-h-screen p-2 transition-colors md:p-4 bg-background text-on-background">
      <p className="hidden md:block">Settings</p>
      <div className="flex items-center gap-2 p-2 rounded-md md:hidden bg-primary/90 text-on-primary">
        <span>Toggle theme:</span>
        <ThemeToggle />
      </div>
    </div>
  );
};

export { Settings };
