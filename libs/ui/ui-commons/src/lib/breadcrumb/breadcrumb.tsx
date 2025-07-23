import { useLocation } from 'react-router-dom';
import { Box, BreadcrumbGroup } from '@cloudscape-design/components';

export function UiBreadCrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const items = [
    { text: '🏠', href: '/homepage' },
    { text: 'Dashboard', href: '/dashboard' },
    ...pathnames.map((segment, index) => {
      const href = '/' + pathnames.slice(0, index + 1).join('/');
      const label = segment
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return { text: label, href };
    }),
  ];

  return (
    <Box padding={{ top: 's', bottom: 's' }} className="bg-white shadow-sm px-4 max-w-5xl mx-auto">
        <div className="w-full flex justify-center">
            <BreadcrumbGroup items={items} ariaLabel="Breadcrumb" />
        </div>
    </Box>
  );
}
