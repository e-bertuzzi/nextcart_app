// src/layouts/UiLayout.tsx
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UiNavBar } from '@nextcart/ui-user-navigation';
import { UiBreadCrumbs } from '@nextcart/ui-user-commons';
import { Box, Button } from '@mui/material';

export function UiLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Rotte dove non vogliamo mostrare il breadcrumb
  const hideBreadcrumbOn = ['/homepage', '/register', '/', '/login'];
  const shouldShowBreadcrumb = !hideBreadcrumbOn.includes(location.pathname);

  // Rotte dove vogliamo mostrare il pulsante back
  const showBackButtonOn = [
    '/dashboard/profile',
    '/dashboard/profile/edit-profile',
    '/dashboard/profile/health',
    '/dashboard/profile/diet',
    '/dashboard/lifestyle',
    '/dashboard/lifestyle/activity',
    '/dashboard/lifestyle/body',
    '/dashboard/products',
    '/dashboard/products/list',
    '/dashboard/cart',
  ];

  const hideBackButtonOn = [
    '/homepage',
    '/',
    '/login',
    '/register',
    '/dashboard/lifestyle/activity/edit',
    '/dashboard/profile/health/edit',
    '/dashboard/profile/diet/edit',
    '/dashboard/lifestyle/body/edit'
  ]; // rotte da escludere

  const shouldShowBackButton = (path: string) => {
    // prima verifica se la rotta è tra quelle da nascondere
    if (hideBackButtonOn.includes(path)) return false;

    // poi verifica se la rotta è tra quelle da mostrare o è un sotto-percorso
    return showBackButtonOn.some(
      (route) => path === route || path.startsWith(route + '/')
    );
  };

  return (
    <>
      <UiNavBar />

      <Box
        component="main"
        sx={{
          pt: '64px',
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(to bottom, #a7f0c4, #d9f7eb, #ffffff)',
        }}
      >
        {(shouldShowBreadcrumb || shouldShowBackButton(location.pathname)) && (
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              flexDirection: 'column', // verticale: breadcrumb sopra, pulsante sotto
              alignItems: 'center', // centra tutto orizzontalmente
              gap: 1.5, // distanza tra breadcrumb e pulsante
            }}
          >
            {shouldShowBreadcrumb && <UiBreadCrumbs />}

            {shouldShowBackButton(location.pathname) && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(-1)}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  borderRadius: 2,
                  paddingX: 1.5,
                  paddingY: 0.5,
                  minWidth: 'fit-content',
                }}
              >
                &larr; Back
              </Button>
            )}
          </Box>
        )}

        <Box
          component="section"
          sx={{
            width: '100%',
            flex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            overflow: 'hidden',
            pt: 2,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default UiLayout;
