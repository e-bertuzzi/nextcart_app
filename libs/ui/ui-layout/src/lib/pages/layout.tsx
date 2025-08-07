import { Outlet, useLocation } from 'react-router-dom';
import { UiNavBar } from '@nextcart/ui-navigation';
import { UiBreadCrumbs } from '@nextcart/ui-commons';
import { UiBackButton } from '@nextcart/ui-commons';

export function UiLayout() {
  const location = useLocation();

  const hideBreadcrumbOn = [
    '/homepage',
    '/register',
    '/',
    '/login',
    '/dashboard',
  ];
  const shouldShowBreadcrumb = !hideBreadcrumbOn.includes(location.pathname);

  const showBackButtonOn = [
    '/health',
    '/health/edit',
    '/diet',
    '/diet/edit',
    '/edit-profile',
    '/physical-activity',
    '/physical-activity/edit',
    '/body-composition',
    '/body-composition/edit',
    '/products',
  ];

  function shouldShowBackButton(path: string) {
    // Mostra se è esattamente uno degli elementi oppure se inizia con '/products/' (dettaglio)
    return showBackButtonOn.includes(path) || path.startsWith('/products/');
  }

  return (
    <>
      <UiNavBar />
      <main
        className="mx-auto w-full max-w-[1800px] px-4"
        style={{ paddingTop: '64px' }}
      >
        {shouldShowBreadcrumb && (
          <div className="mx-auto w-full max-w-[1400px] mb-4">
            <UiBreadCrumbs />
          </div>
        )}

        {shouldShowBackButton(location.pathname) && (
          <div className="mb-4 pl-4">
            <UiBackButton />
          </div>
        )}

        <Outlet />
      </main>
    </>
  );
}
