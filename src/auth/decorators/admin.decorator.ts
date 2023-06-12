import { SetMetadata } from '@nestjs/common';
import { ADMIN_KEY, PUBLIC_KEY } from 'src/constants/key-decorator';
import { ROLES } from 'src/constants/roles';

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);