// components/Navbar/Navbar.tsx
import { AppBar, Toolbar, Box } from '@mui/material';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http';

import Logo from '../components/logo';
import GuestNav from '../components/guest-nav';
import UserMenu from '../components/user-menu';
import { UiLogoutModal } from '@nextcart/ui-user-commons';

export function UiNavBar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error('Error during logout: ', error);
    }

    logout();
    setModalVisible(true);

    setTimeout(() => {
      setModalVisible(false);
      navigate('/homepage');
    }, 2000);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={4}
        sx={{ backgroundColor: '#ffffff', color: '#333' }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 6 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Logo />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isLoggedIn ? (
              <UserMenu user={user} onLogout={handleLogout} />
            ) : (
              <GuestNav />
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <UiLogoutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}
