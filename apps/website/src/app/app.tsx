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
import { Role } from '@nextcart/enum';
import ProductEditForm from './product-pages/product-edit';
import ProductCheckPage from './product-pages/product-check';
import CartPage from './cart-pages/cart-page';
import CartEdit from './cart-pages/cart-edit';
import CartDetail from './cart-pages/cart-detail';

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

          <Route element={<PrivateRoute allowedRoles={[Role.isAdmin]} />}>
            <Route path="/products/add" element={<ProductAddForm />} />
            <Route path="/dashboard/products/:id/edit" element={<ProductEditForm />} />
            <Route path="/products/check" element={<ProductCheckPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/profile/edit-profile" element={<EditProfilePage />} />
            <Route path="/dashboard/profile/health" element={<HealthPage />} />
            <Route path="/dashboard/profile/health/edit" element={<HealthEdit />} />
            <Route path="/dashboard/profile/diet" element={<DietPage />} />
            <Route path="/dashboard/profile/diet/edit" element={<DietEdit/>} />
            <Route path="/dashboard/lifestyle/body" element={<BodyPage/>} />
            <Route path="/dashboard/lifestyle/body/edit" element={<BodyEdit/>} />
            <Route path="/dashboard/lifestyle/activity" element={<PhysicalActivityPage/>} />
            <Route path="/dashboard/lifestyle/activity/edit" element={<PhysicalActivityEdit/>} />
            <Route path="/dashboard/products/list" element={<ProductListPage/>} />
            <Route path="/dashboard/products/:productId" element={<ProductDetailPage />} />
            <Route path="/dashboard/cart" element={<CartPage />} />
            <Route path="/dashboard/cart/create" element={<CartEdit />} />
            <Route path="/cart/:cartId" element={<CartDetail />} />
          </Route>
          
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        
      </Routes>
    </UserProvider>
  );
}

export default App;
