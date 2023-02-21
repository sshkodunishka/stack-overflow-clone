/* eslint-disable prettier/prettier */
import { UsersService } from './users.service';
import { Body, Controller, Get, Post, UseGuards, } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { ApiTags,ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './users.model';
import { RolesGuard } from 'src/roles/roles.guards';
import { Roles } from 'src/roles/roles.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status:200, type: [User]})
    @UseGuards(RolesGuard)
    @Roles('admin')
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers()
    }
}
