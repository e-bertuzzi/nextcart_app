import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Typography, Link } from '@mui/material';

const breadcrumbNameMap: { [key: string]: string } = {
  '/homepage': '🏠',
  '/profile': 'Profile',
  '/profile/edit-profile': 'Edit Profile',
};

export function UiBreadCrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const items = [{ text: '🏠', href: '/homepage' }];
  
  let path = '';
  pathnames.forEach((segment) => {
    path += `/${segment}`;
    const label = breadcrumbNameMap[path] || 
                  segment
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
    items.push({ text: label, href: path });
  });

  return (
    <Box
      sx={{
        py: 1,
        px: 3,
        bgcolor: 'background.paper',
        boxShadow: 1,
        maxWidth: 1200,
        mx: 'auto',
        mt: 2,
        borderRadius: 1,
      }}
    >
      <Breadcrumbs aria-label="breadcrumb" separator="›">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return isLast ? (
            <Typography key={item.href} color="text.primary">
              {item.text}
            </Typography>
          ) : (
            <Link
              key={item.href}
              component={RouterLink}
              to={item.href}
              underline="hover"
              color="inherit"
            >
              {item.text}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
