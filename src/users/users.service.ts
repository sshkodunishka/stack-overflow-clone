/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from 'roles/roles.model';

export type user = User

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async createUser(dto: CreateUserDto, role: Role) {
    const user = await this.usersRepository.create({
      ...dto,
      role
    });
     await this.usersRepository.save(user)
    return user;
  }

  async getAllUsers() {
    const users = await this.usersRepository.find({
      relations: {
        role: true
      }
    });
    return users;
  }

  async getUserByLogin(login: string) {
    const user = await this.usersRepository.findOne({
      where: {
        login: login
      },
      relations: {
        role: true
      }
    })
    return user;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: id
      },
      relations: {
        role: true
      }
    })
    return user;
  }
}
