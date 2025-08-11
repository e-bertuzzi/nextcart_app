/*import { JSX } from 'react';
import { useUser } from '@nextcart/web-auth';
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
}*/

// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../roles/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Leggi i ruoli richiesti definiti nel decorator @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      // Se non ci sono ruoli specificati, lascia accedere (nessuna restrizione)
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) return false; // no user = accesso negato

    // Controlla se il ruolo dell’utente è uno dei ruoli richiesti
    return requiredRoles.includes(user.role);
  }
}

