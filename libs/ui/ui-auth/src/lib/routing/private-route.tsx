import { useLocation, Navigate, Outlet } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Role } from '@nextcart/enum'; // importa il tuo enum Role

export function PrivateRoute({ allowedRoles }: { allowedRoles?: Role[] }) {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  // Non loggato → login
  if (!user) {
    if (location.pathname !== '/login') {
      return <Navigate to="/login" replace />;
    }
    return <Outlet />;
  }

  // Controllo ruoli
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
