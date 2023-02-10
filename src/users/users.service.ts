/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

export type user = User

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async createUser(dto: CreateUserDto) {
    const user = await this.usersRepository.create(dto);
     await this.usersRepository.save(user)
    return user;
  }

  async getAllUsers() {
    const users = await this.usersRepository.find();
    return users;
  }

  async getUserByLogin(login: string) {
    const user = await this.usersRepository.findOne({
      where: {
        login: login
      }
    })
    return user;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id
      }
    })
    return user;
  }
}
