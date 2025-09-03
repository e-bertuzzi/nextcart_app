import { PrivateRoute, PublicRoute } from '@nextcart/ui-auth';
import { UserProvider } from '@nextcart/web-auth';
import LoginPage from './auth-pages/login-pages/login';

import { Route, Routes, Navigate } from 'react-router-dom';
import RegistrationPage from './auth-pages/registration-pages/registration';
import HomePage from './home-pages/home';
import LayoutPage from './common-pages/navbar-page';
import NotFoundPage from './common-pages/not-found-page';
import DashboardPage from './dashboard-pages/dashboard-page';
import ProfilePage from './profile-pages/profile-page';
import ProfileFormPage from './profile-pages/edit-profile-page';
import HealthEdit from './health-pages/health-edit';
import HealthPage from './health-pages/health-summary';
import DietPage from './diet-pages/diet-page';
import DietEdit from './diet-pages/diet-edit';
import LifestylePage from './lifestyle-pages/lifestyle-page';
import PhysicalActivityEdit from './lifestyle-pages/lifestyle-form';
import PhysicalActivityPage from './lifestyle-pages/lifestyle-summary';
import BodyEdit from './body-composition-pages/body-edit';
import BodyPage from './body-composition-pages/body-page';
import ProductPage from './product-pages/product-page';
import ProductListPage from './product-pages/product-list';
import CartPage from './cart-pages/cart-page';
import CartEdit from './cart-pages/cart-edit-page';
import CartDetail from './cart-pages/cart-detail-page';
import ProductDetailPage from './product-pages/product-detail';

export function App() {
  return (
    <UserProvider>
      <Routes>
        <Route element={<LayoutPage />}>
          <Route path="/homepage" element={<HomePage />} />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
            <Route path="/dashboard/profile/edit-profile" element={<ProfileFormPage />} />
            <Route path="/dashboard/profile/health" element={<HealthPage />} />
            <Route path="/dashboard/profile/health/edit" element={<HealthEdit />} />
            <Route path="/dashboard/profile/diet" element={<DietPage />} />
            <Route path="/dashboard/profile/diet/edit" element={<DietEdit />} />
            <Route path="/dashboard/lifestyle" element={<LifestylePage />} />
            <Route path="/dashboard/lifestyle/activity" element={<PhysicalActivityPage />} />
            <Route path="/dashboard/lifestyle/activity/edit" element={<PhysicalActivityEdit />} />
            <Route path="/dashboard/lifestyle/body/edit" element={<BodyEdit />} />
            <Route path="/dashboard/lifestyle/body" element={<BodyPage />} />
            <Route path="/dashboard/products" element={<ProductPage />} />
            <Route path="/dashboard/products/list" element={<ProductListPage />} />
            <Route path="/dashboard/products/:productId" element={<ProductDetailPage />} />
            <Route path="/dashboard/cart" element={<CartPage />} />
            <Route path="/dashboard/cart/edit" element={<CartEdit />} />
            <Route path="/dashboard/cart/:cartId" element={<CartDetail />} />
          </Route>
      
        <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
