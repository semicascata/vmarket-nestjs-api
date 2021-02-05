import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../../modules/auth/dto/new-user.dto';
import { RoleGuard } from '../guards/role.guard';

export function AuthRole(...roles: Role[]) {
  return applyDecorators(SetMetadata('role', roles), UseGuards(RoleGuard));
}
