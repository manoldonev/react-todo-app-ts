import { NavLink } from 'react-router-dom';
import { navigationItems } from './navigationItems';

const Navigation = ({ className = '' }: { className?: string }): JSX.Element => {
  return (
    <nav className={`items-center w-auto text-on-primary ${className}`}>
      {navigationItems.map((item) => (
        <NavLink key={item} className={({ isActive }) => `block mr-4 ${isActive ? 'underline' : ''}`} to={`/${item}`}>
          <span className="capitalize">{item}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export { Navigation };
