import { AdjustmentsVerticalIcon, ChartBarSquareIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import { navigationItems } from './navigationItems';

const mapNavigationIcon = (item: string): JSX.Element => {
  switch (item) {
    case 'tasks':
      return <ClipboardDocumentListIcon className="mx-auto mb-1 h-6 w-6" />;
    case 'analytics':
      return <ChartBarSquareIcon className="mx-auto mb-1 h-6 w-6" />;
    case 'settings':
      return <AdjustmentsVerticalIcon className="mx-auto mb-1 h-6 w-6" />;
    default:
      throw new Error('Unrecognized navigation item.');
  }
};

const BottomNavigation = ({ className = '' }: { className?: string }): JSX.Element => {
  return (
    <nav
      data-testid="bottom-navigation"
      className={`flex justify-between bg-primary text-xs text-on-primary ${className}`}
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
