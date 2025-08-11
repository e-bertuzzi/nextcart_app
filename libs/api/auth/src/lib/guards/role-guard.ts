import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../roles/roles.decorator';
import { Role } from '@nextcart/enum'; // importa l'enum Role

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    console.log('User in RolesGuard:', user);
    if (!user) return false;

    const allowed = requiredRoles.includes(user.role);
    console.log(
      'Allowed roles:',
      requiredRoles,
      'User role:',
      user.role,
      'Allowed:',
      allowed
    );

    return allowed;
  }
}
