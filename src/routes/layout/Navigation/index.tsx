import { AdjustmentsIcon, ChartSquareBarIcon, ClipboardListIcon } from '@heroicons/react/outline';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useHeadroom } from '../../../hooks/useHeadroom';

export const navigationItems = ['tasks', 'analytics', 'settings'];

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

const BottomNavigation = (): JSX.Element => {
  const rootRef = useRef<HTMLElement | null>(null);
  useHeadroom(rootRef, {
    headroomOptions: {
      classes: {
        initial: 'transition-transform duration-300 will-change-transform',
        pinned: 'translate-y-0',
        unpinned: 'translate-y-full',
      },
    },
  });

  return (
    <nav
      ref={rootRef}
      className="z-10 fixed inset-x-0 bottom-0 flex justify-between text-xs text-blue-900 bg-blue-100 md:hidden"
    >
      {navigationItems.map((item) => (
        <NavLink
          key={item}
          to={`/${item}`}
          className={({ isActive }) =>
            `w-full p-3 text-center transition duration-300 ${
              isActive ? 'bg-blue-200 text-blue-800' : ''
            } hover:bg-blue-200 hover:text-blue-800`
          }
        >
          {mapNavigationIcon(item)}
          <span className="capitalize">{item}</span>
        </NavLink>
      ))}
    </nav>
  );
};

const Navigation = (): JSX.Element => {
  return (
    <nav className="items-center hidden w-auto md:flex">
      {navigationItems.map((item) => (
        <NavLink
          key={item}
          className={({ isActive }) => `block mr-4 md:text-white ${isActive ? 'underline' : ''}`}
          to={`/${item}`}
        >
          <span className="capitalize">{item}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export { BottomNavigation, Navigation };
