/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.model';
import { AuthModule } from 'src/auth/auth.module';
import { Question } from 'src/questions/questions.model';
import { Role } from '../roles/roles.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Question, Role]),
    forwardRef(() => AuthModule),

  ],
  providers: [UsersService],
  exports: [
    UsersService,
  ],
  controllers: [UsersController],
})
export class UsersModule {

}
