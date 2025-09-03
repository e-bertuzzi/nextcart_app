// components/Navbar/GuestNav.tsx
import { Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function GuestNav() {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        component={RouterLink}
        to="/login"
        variant="text"
        sx={{
          fontWeight: 600,
          fontSize: '1rem',
          color: 'text.primary',
          '&:hover': { color: 'success.main', backgroundColor: 'transparent' },
        }}
      >
        Login
      </Button>
      <Button
        component={RouterLink}
        to="/register"
        variant="text"
        sx={{
          fontWeight: 600,
          fontSize: '1rem',
          color: 'text.primary',
          '&:hover': { color: 'success.main', backgroundColor: 'transparent' },
        }}
      >
        Registration
      </Button>
    </Stack>
  );
}
