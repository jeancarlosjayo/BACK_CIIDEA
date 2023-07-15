import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    console.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers.authorization;
    const token = authorizationHeader && authorizationHeader.split(' ')[1];
    const decodedToken: any = jwt.verify(token, 'mysecretkey');

    console.log(decodedToken.role);
    const hasRequiredRoles = requiredRoles.every((role) =>
      decodedToken.role.includes(role),
    );
    console.log(hasRequiredRoles);
    return hasRequiredRoles;
  }
}
