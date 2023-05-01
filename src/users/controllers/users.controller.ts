import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersEntity } from '../entities/users.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async getAlls(): Promise<UsersEntity[]> {
        return await this.userService.findUsers();
    }
}
