import { useUser } from '../context/user-context'; // o dove tieni il contesto utente
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute() {
  const { user, loading } = useUser();

  console.log('loading:', loading, 'user:', user);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}