import { useLocation, Navigate, Outlet } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

interface PrivateRouteProps {
  allowedRoles?: string[]; // Ruoli ammessi per la rotta
}

export function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  // Se non loggato → login
  if (!user) {
    if (location.pathname !== '/login') {
      return <Navigate to="/login" replace />;
    }
    return <Outlet />;
  }

  // Se è definito allowedRoles, verifica che l'utente abbia uno di questi ruoli
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Qui puoi decidere cosa fare: redirect a pagina accesso negato o homepage
    return <Navigate to="/unauthorized" replace />;
  }

  // Altrimenti mostra la rotta protetta
  return <Outlet />;
}
