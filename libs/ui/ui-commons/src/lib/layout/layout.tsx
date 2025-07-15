import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../navbar/pages/navbar';
import { Breadcrumbs } from '../breadcrumb/breadcrumb';

export default function Layout() {
  const location = useLocation();

  // Pagine dove non vuoi mostrare il breadcrumb
  const hideBreadcrumbOn = ['/homepage', '/register', '/', '/login', '/dashboard'];

  const shouldShowBreadcrumb = !hideBreadcrumbOn.includes(location.pathname);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        {shouldShowBreadcrumb && <Breadcrumbs />}
        <Outlet />
      </main>
    </>
  );
}
