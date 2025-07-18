import { PrivateRoute, PublicRoute, UserProvider } from '@nextcart/ui-auth';
import LoginPage from './auth-pages/login-pages/login';
import RegistrationPage from './auth-pages/registration-pages/registration';
import LayoutPage from './common-pages/navbar-page';
import HomePage from './home-pages/home';

import { Route, Routes, Link, Navigate } from 'react-router-dom';
import EditProfilePage from './profile-pages/edit-profile';
import DashboardPage from './dashboard-pages/dashboard-page';
import NotFoundPage from './common-pages/not-found-page';
import HealthPage from './health-pages/health-page';
import HealthEdit from './health-pages/health-edit';
import DietPage from './diet-pages/diet-page';
import DietEdit from './diet-pages/diet-edit';

export function App() {
  return (
    <UserProvider>
      <Routes>
        <Route element={<LayoutPage />}>
          <Route path="/" element={<Navigate to="/homepage" />} />
          <Route path="/homepage" element={<HomePage />} />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
          </Route>

          {/* Rotte protette */}
          <Route element={<PrivateRoute />}>
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/health" element={<HealthPage />} />
            <Route path="/health/edit" element={<HealthEdit />} />
            <Route path="/diet" element={<DietPage/>} />
            <Route path="/diet/edit" element={<DietEdit/>} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
