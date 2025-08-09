import { PrivateRoute, PublicRoute } from '@nextcart/ui-auth';
import { UserProvider } from '@nextcart/web-auth'
import LoginPage from './auth-pages/login-pages/login';
import RegistrationPage from './auth-pages/registration-pages/registration';
import LayoutPage from './common-pages/navbar-page';
import HomePage from './home-pages/home';

import { Route, Routes, Navigate } from 'react-router-dom';
import EditProfilePage from './profile-pages/edit-profile';
import DashboardPage from './dashboard-pages/dashboard-page';
import NotFoundPage from './common-pages/not-found-page';
import HealthPage from './health-pages/health-page';
import HealthEdit from './health-pages/health-edit';
import DietPage from './diet-pages/diet-page';
import DietEdit from './diet-pages/diet-edit';
import BodyPage from './body-pages/body-page';
import BodyEdit from './body-pages/body-edit';
import PhysicalActivityPage from './activity-pages/activity-page';
import PhysicalActivityEdit from './activity-pages/activity-edit';
import ProductListPage from './product-pages/product-list';
import ProductDetailPage from './product-pages/product-detail';
import ProductAddForm from './product-pages/product-form';

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
            <Route path="/body-composition" element={<BodyPage/>} />
            <Route path="/body-composition/edit" element={<BodyEdit/>} />
            <Route path="/physical-activity" element={<PhysicalActivityPage/>} />
            <Route path="/physical-activity/edit" element={<PhysicalActivityEdit/>} />
            <Route path='/products' element={<ProductListPage/>} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            <Route path="/products/add/new" element={<ProductAddForm />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
