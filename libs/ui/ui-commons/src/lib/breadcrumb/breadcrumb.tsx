import { useLocation } from 'react-router-dom';
import { Box, BreadcrumbGroup } from '@cloudscape-design/components';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const items = [
    { text: '🏠', href: '/homepage' },
    { text: 'Dashboard', href: '/dashboard' },
    ...pathnames.map((segment, index) => {
      const href = '/' + pathnames.slice(0, index + 1).join('/');
      const label = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());

      return { text: label, href };
    }),
  ];

  return (
    <Box
      padding={{ top: 's', bottom: 's' }}
      className="flex justify-center bg-white shadow-sm"
    >
      <BreadcrumbGroup
        items={items}
        ariaLabel="Breadcrumb"
      />
    </Box>
  );
}
