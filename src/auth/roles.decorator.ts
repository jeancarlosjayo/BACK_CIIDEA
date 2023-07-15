import { SetMetadata } from '@nestjs/common';
export const HashRoles = (...roles: string[]) => SetMetadata('roles', roles);