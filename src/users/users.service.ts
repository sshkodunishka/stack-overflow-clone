import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async createUser(dto: CreateUserDto): Promise<User>{
        const user = await this.userRepository.save(dto);
        return user;
    }


    async getAllUsers(): Promise<User[]>{
        const users = await this.userRepository.find();
        return users;
    } 
}
