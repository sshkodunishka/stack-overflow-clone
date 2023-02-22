/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { TokensDto } from '../users/dto/tokens.dto';
import { User } from '../users/users.model';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { RefreshTokenDto } from '../users/dto/refresh-token.dto';
import { JwtAuthGuard } from './jwt.auth.guard';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({summary: 'Login'})
    @ApiResponse({status:200, type: TokensDto})
    @Post('/login')
    login(@Body() UserDto: LoginUserDto) {
        return this.authService.login(UserDto)
    }

    @ApiOperation({summary: 'Registration'})
    @ApiResponse({status:200, type: User})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
    }

    @ApiOperation({summary: 'Update refreshed tokens'})
    @ApiResponse({status:200, type: RefreshTokenDto})
    @Post('/refresh-token')
    getRefreshedTokens(@Body() refreshTokenDto: RefreshTokenDto){
       return this.authService.getRefreshedTokens(refreshTokenDto)
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Logout'})
    @ApiResponse({status:200})
    @Get('/logout')
    logout(@Req() req: any){
        const id =  req.user.id;
       return this.authService.deleteRefreshToken(id);
    }
}
