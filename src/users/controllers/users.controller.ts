import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersEntity } from '../entities/users.entity';
import { UserDto, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    public async registerUser(@Body() body: UserDto) {
        return await this.usersService.createUser(body);
    }

    @Post('add-to-project')
    public async addToProject(@Body() body: UserToProjectDTO) {
        return await this.usersService.relationToProject(body);
    }

    @Roles('ADMIN')
    @Get('all')
    public async findAllUsers() {
        return await this.usersService.findUsers();
    }

    @Get(':id')
    @PublicAccess()
    public async findUserById(@Param('id',new ParseUUIDPipe()) id: string) {
        return await this.usersService.findUserById(id);
    }

    @Put('edit/:id')
    public async updateUser(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UserUpdateDTO,
    ) {
        return await this.usersService.updateUser(body, id);
    }

    @Delete('delete/:id')
    public async deleteUser(@Param('id',new ParseUUIDPipe()) id: string) {
        return await this.usersService.deleteUser(id);
    }
}
