import { Outlet } from 'react-router-dom';
import { BottomNavigation, Header } from '../components';

const Layout = (): JSX.Element => {
  return (
    // NOTE: cannot use Fragment here as it will break the sticky header
    <div className="h-full">
      <Header />
      <main className="h-full">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export { Layout };
