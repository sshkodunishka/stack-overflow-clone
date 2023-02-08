/* eslint-disable prettier/prettier */
import { UsersService } from './users.service';
import { Body, Controller, Get, Post, UseGuards, } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers()
    }
}
