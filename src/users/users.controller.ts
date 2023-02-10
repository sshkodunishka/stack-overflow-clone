/* eslint-disable prettier/prettier */
import { UsersService } from './users.service';
import { Body, Controller, Get, Post, UseGuards, } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { ApiTags,ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './users.model';


@ApiTags('Ответы')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @ApiOperation({summary: 'Создать пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @ApiOperation({summary: 'Получить пользователя'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers()
    }
}
