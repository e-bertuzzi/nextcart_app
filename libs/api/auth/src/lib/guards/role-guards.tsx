import { JSX } from 'react';
import { useUser } from '@nextcart/ui-auth';
import { Navigate } from 'react-router-dom';

interface RoleGuardProps {
  allowedRoles: string[];
  children: JSX.Element;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { user, loading } = useUser();

  if (loading) return null;

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
