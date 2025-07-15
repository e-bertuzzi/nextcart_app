import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/user-context';

export function PrivateRoute() {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!user && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
