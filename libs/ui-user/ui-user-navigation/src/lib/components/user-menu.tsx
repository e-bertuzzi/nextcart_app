// components/Navbar/UserMenu.tsx
import { useState } from 'react';
import { Button, Menu, MenuItem, Typography, Box } from '@mui/material';
import { FaChevronDown } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

interface UserMenuProps {
  user: { email: string };
  onLogout: () => void;
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    onLogout();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        endIcon={<FaChevronDown />}
        sx={{
          fontWeight: 600,
          textTransform: 'none',
          color: 'text.primary',
          '&:hover': { color: 'success.main', backgroundColor: 'transparent' },
          maxWidth: 250,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        title={user.email}
      >
        {user.email}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box px={2} py={1}>
          <Typography variant="body2" color="text.secondary">
            Login as <strong>{user.email}</strong>
          </Typography>
        </Box>
        <MenuItem component={RouterLink} to="/dashboard/profile" onClick={handleClose}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
