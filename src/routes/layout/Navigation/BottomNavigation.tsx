import { AdjustmentsIcon, ChartSquareBarIcon, ClipboardListIcon } from '@heroicons/react/outline';
import { NavLink } from 'react-router-dom';
import { navigationItems } from './navigationItems';

const mapNavigationIcon = (item: string): JSX.Element => {
  switch (item) {
    case 'tasks':
      return <ClipboardListIcon className="w-6 h-6 mx-auto mb-1" />;
    case 'analytics':
      return <ChartSquareBarIcon className="w-6 h-6 mx-auto mb-1" />;
    case 'settings':
      return <AdjustmentsIcon className="w-6 h-6 mx-auto mb-1" />;
    default:
      throw new Error('Unrecognized navigation item.');
  }
};

const BottomNavigation = ({ className = '' }: { className?: string }): JSX.Element => {
  return (
    <nav
      data-testid="bottom-navigation"
      className={`flex justify-between text-xs bg-primary text-on-primary ${className}`}
    >
      {navigationItems.map((item) => (
        <NavLink
          key={item}
          to={`/${item}`}
          className={({ isActive }) =>
            `w-full p-3 text-center transition duration-300 ${isActive ? 'bg-primary-variant' : ''}`
          }
        >
          {mapNavigationIcon(item)}
          <span className="capitalize">{item}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export { BottomNavigation };
