import { Outlet } from 'react-router-dom';
import { Headroom, Legroom } from '../../components/Headroom';
import { Header } from './Header';
import { BottomNavigation } from './Navigation';

const Layout = (): JSX.Element => {
  return (
    // NOTE: cannot use Fragment here as it will break the sticky header
    <div className="min-h-screen bg-background">
      <Headroom className="z-10">
        <Header />
      </Headroom>
      <main>
        <Outlet />
      </main>
      <Legroom className="z-10">
        <BottomNavigation className="md:hidden" />
      </Legroom>
    </div>
  );
};

export { Layout };
