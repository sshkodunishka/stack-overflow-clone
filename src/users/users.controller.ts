/* eslint-disable prettier/prettier */
import { UsersService } from './users.service';
import { Controller, Get, UseGuards, } from '@nestjs/common';
import { JwtAuthGuard } from 'auth/jwt.auth.guard';
import { ApiTags,ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './users.model';
import { RolesGuard } from 'roles/roles.guards';
import { Roles } from 'roles/roles.decorator';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @ApiOperation({summary: 'Получить всех пользователей'})
    @ApiResponse({status:200, type: [User]})
    @UseGuards(RolesGuard)
    @Roles('admin')
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers()
    }
}
