/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService) { }


  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByLogin(userDto.login);
    if (!candidate) {
      throw new HttpException('There is already such a user', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5)
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword })
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = { login: user.login, id: user.id }
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByLogin(userDto.login)
    const passwordEquals = await bcrypt.compare(userDto.password, user.password)
    if(user && passwordEquals){
      return user
    }
    throw new UnauthorizedException({message:'Wrong login or password'})
  }
}
