import { ThemeToggle } from '../../components/ThemeToggle';

const Settings = (): JSX.Element => {
  return (
    <div data-testid="settings" className="min-h-screen bg-background p-2 text-on-background transition-colors md:p-4">
      <p className="hidden md:block">Settings</p>
      <div className="flex items-center gap-2 rounded-md bg-primary/90 p-2 text-on-primary md:hidden">
        <span>Toggle theme:</span>
        <ThemeToggle />
      </div>
    </div>
  );
};

export { Settings };
