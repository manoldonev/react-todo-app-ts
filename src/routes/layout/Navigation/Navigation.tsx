import { NavLink } from 'react-router-dom';
import { navigationItems } from './navigationItems';

const Navigation = ({ className = '' }: { className?: string }): JSX.Element => {
  return (
    <nav data-testid="top-navigation" className={`w-auto items-center text-on-primary ${className}`}>
      {navigationItems.map((item) => (
        <NavLink key={item} className={({ isActive }) => `mr-4 block ${isActive ? 'underline' : ''}`} to={`/${item}`}>
          <span className="capitalize">{item}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export { Navigation };
