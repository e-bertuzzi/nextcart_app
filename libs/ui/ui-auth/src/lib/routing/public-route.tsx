// src/routes/PublicRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { useUser } from '@nextcart/web-auth';

export function PublicRoute() {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  // Se l'utente è loggato → reindirizza alla homepage
  if (user) return <Navigate to="/homepage" replace />;

  // Altrimenti mostra la route pubblica (login/register)
  return <Outlet />;
}
