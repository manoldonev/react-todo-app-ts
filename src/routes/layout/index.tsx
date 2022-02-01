import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNavigation } from './Navigation';

const Layout = (): JSX.Element => {
  return (
    // NOTE: cannot use Fragment here as it will break the sticky header
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export { Layout };
