import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('roles---- ' + roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('user++++' + user);
    console.log('????????' + roles == user.roleName);
    if (roles == user.roleName) {
      return roles == user.roleName;
    } else {
      throw new UnauthorizedException({ message: 'user has no rights' });
    }
  }
}
