// roles.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    console.log('Required roles:', requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('User object:', user);
    console.log('User role:', user?.role);

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (!user.role) {
      throw new ForbiddenException('User role not found');
    }

    const hasRole = matchRoles(requiredRoles, user.role);
    console.log('Has required role:', hasRole);

    return hasRole;
  }
}

function matchRoles(
  requiredRoles: string[],
  userRoles: string | string[],
): boolean {
  const roles = Array.isArray(userRoles) ? userRoles : [userRoles];

  console.log('Matching:', requiredRoles, 'against', roles);

  if (!roles || roles.length === 0) {
    return false;
  }

  return requiredRoles.some((role) => roles.includes(role));
}
