import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'questions/questions.model';
import { QuestionsModule } from 'questions/questions.module';
import { User } from 'users/users.model';
import { UsersModule } from 'users/users.module';
import { AnswersController } from './answers.controller';
import { Answer } from './answers.model';
import { AnswersService } from './answers.service';
import { Role } from 'roles/roles.model';
import { AuthModule } from 'auth/auth.module';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService],
  imports: [
    TypeOrmModule.forFeature([Answer, Question, User, Role]),
    QuestionsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AnswersModule {}
