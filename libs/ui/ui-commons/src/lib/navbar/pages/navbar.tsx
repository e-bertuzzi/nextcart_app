// components/Navbar/Navbar.tsx
import { Box } from '@cloudscape-design/components';
import { useUser } from '@nextcart/ui-auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { api } from '@nextcart/http'

import Logo from '../components/logo';
import GuestNav from '../components/guest-nav';
import UserMenu from '../components/user-menu';
import LogoutModal from '../../modals/components/logout-modals';

export default function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true });
    } catch (error) {
      console.error('Error during logout: ', error);
      // puoi comunque proseguire anche se fallisce
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
      <Box className="flex items-center fixed top-0 left-0 right-0 z-50 bg-white shadow-md h-16 px-4 sm:px-24 justify-between">
        <Logo />

        <div className="flex items-center gap-4 justify-end flex-grow min-w-0">
          <nav className="flex gap-4 text-gray-700 items-center min-w-0 max-w-full">
            {isLoggedIn ? (
              <UserMenu user={user} onLogout={handleLogout} />
            ) : (
              <GuestNav />
            )}
          </nav>
        </div>
      </Box>

      <LogoutModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
}
