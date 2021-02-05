import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../modules/auth/dto/new-user.dto';

@Injectable()
export class RoleGuard implements CanActivate {
  private logger = new Logger('RoleGuard');

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('role', context.getHandler());

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!roles || roles.length === 0) {
      return true;
    }

    const matchUserRole = this.matchRole(roles, user.role);

    if (matchUserRole) {
      this.logger.verbose('user role authorized');
      return matchUserRole;
    } else {
      this.logger.error('user role not authorized');
      throw new UnauthorizedException('user role not authorized');
    }
  }

  // check the user role
  private matchRole(roles: string[], userRole: Role) {
    return roles.includes(userRole);
  }
}
