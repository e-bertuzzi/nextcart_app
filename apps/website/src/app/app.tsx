import { UserProvider } from '@nextcart/ui-auth';
import LoginPage from './auth-pages/login-pages/login';
import RegistrationPage from './auth-pages/registration-pages/registration';
import LayoutPage from './common-pages/navbar-page';
import HomePage from './home-pages/home';
import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';
import EditProfilePage from './profile-pages/edit-profile';

export function App() {
  return (
    <UserProvider>
      <Routes>
        <Route element={<LayoutPage />}>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
