import { useLocation } from 'react-router-dom';
import { Box, BreadcrumbGroup } from '@cloudscape-design/components';

const breadcrumbNameMap: { [key: string]: string } = {
  '/homepage': '🏠',
  '/dashboard': 'Dashboard',
  '/dashboard/profile': 'Profile',
  '/dashboard/profile/health': 'Health',
  '/dashboard/profile/health/edit': 'Edit Health',
};

const excludedSegments = ['profile', 'lifestyle', 'products'];

export function UiBreadCrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const items = [{ text: breadcrumbNameMap['/homepage'], href: '/homepage' }];

  let path = '';
  pathnames.forEach((segment) => {
    path += `/${segment}`;
    if (excludedSegments.includes(segment)) return;

    const label =
      breadcrumbNameMap[path] ||
      segment
        .replace(/-/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    items.push({ text: label, href: path });
  });

  return (
    <Box
      padding={{ top: 's', bottom: 's' }}
      className="bg-white shadow-sm px-4 max-w-5xl mx-auto"
    >
      <div className="w-full flex justify-center">
        <BreadcrumbGroup items={items} ariaLabel="Breadcrumb" />
      </div>
    </Box>
  );
}
