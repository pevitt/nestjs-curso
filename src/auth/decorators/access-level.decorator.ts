import { SetMetadata } from '@nestjs/common';
import { ACCESS_LEVEL_KEY, PUBLIC_KEY } from 'src/constants/key-decorator';
import { ACCESS_LEVEL } from 'src/constants/roles';

export const AccessLevel = (level:number) => 
    SetMetadata(ACCESS_LEVEL_KEY, level);