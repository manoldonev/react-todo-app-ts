import { Outlet } from 'react-router-dom';
import { Headroom, Legroom } from '../../components/Headroom';
import { Header } from './Header';
import { BottomNavigation } from './Navigation';

const Layout = (): JSX.Element => {
  return (
    // NOTE: cannot use Fragment here as it will break the sticky header
    <div>
      <Headroom>
        <Header />
      </Headroom>
      <main>
        <Outlet />
      </main>
      <Legroom>
        <BottomNavigation />
      </Legroom>
    </div>
  );
};

export { Layout };
