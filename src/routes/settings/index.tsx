import { ThemeToggle } from '../../components/ThemeToggle';

const Settings = (): JSX.Element => {
  return (
    <div className="min-h-screen p-2 transition-colors bg-background">
      <div className="flex items-center gap-2 p-2 rounded-md md:hidden bg-primary/90 text-on-primary">
        <span>Toggle theme:</span>
        <ThemeToggle />
      </div>
    </div>
  );
};

export { Settings };
