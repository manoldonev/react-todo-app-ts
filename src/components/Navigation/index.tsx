import { AdjustmentsIcon, ChartSquareBarIcon, ClipboardListIcon } from '@heroicons/react/outline';
import { NavLink } from 'react-router-dom';

export const navigationItems = ['tasks', 'analytics', 'settings'];

const mapNavigationRoute = (item: string): string => {
  switch (item) {
    case 'tasks':
      return '/';
    case 'analytics':
    case 'settings':
      return `/${item}`;
    default:
      throw new Error('Unrecognized navigation item');
  }
};

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
  return (
    <nav className="fixed inset-x-0 bottom-0 flex justify-between text-xs text-blue-900 bg-blue-100 md:hidden">
      {navigationItems.map((item) => (
        <NavLink
          to={mapNavigationRoute(item)}
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
          className={({ isActive }) => `block mr-4 md:text-white ${isActive ? 'underline' : ''}`}
          to={mapNavigationRoute(item)}
        >
          <span className="capitalize">{item}</span>
        </NavLink>
      ))}

      {/* <div className="flex text-sm">
        <a
          className="p-2 ml-2 font-semibold leading-none bg-white border border-gray-100 rounded text-sky-500 hover:border-transparent hover:bg-gray-100"
          href="/login"
        >
          Login
        </a>
        <a
          className="p-2 ml-2 font-semibold leading-none text-gray-100 border rounded border-sky-600 bg-sky-500 hover:border-transparent hover:bg-sky-400"
          href="/login"
        >
          Sign up
        </a>
      </div> */}
    </nav>
  );
};

export { BottomNavigation, Navigation };
