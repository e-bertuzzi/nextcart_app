import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../navbar/pages/navbar';
import { Breadcrumbs } from '../breadcrumb/breadcrumb';

export default function Layout() {
  const location = useLocation();
  const hideBreadcrumbOn = ['/homepage', '/register', '/', '/login', '/dashboard'];
  const shouldShowBreadcrumb = !hideBreadcrumbOn.includes(location.pathname);

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-[1800px] px-4" style={{ paddingTop: '64px' }}>
        {shouldShowBreadcrumb && (
          <div className="mx-auto w-full max-w-[1400px]">
            <Breadcrumbs />
          </div>
        )}
        <Outlet />
      </main>
    </>
  );
}
