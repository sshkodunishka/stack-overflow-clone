import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/questions/questions.model';
import { QuestionsModule } from 'src/questions/questions.module';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { AnswersController } from './answers.controller';
import { Answer } from './answers.model';
import { AnswersService } from './answers.service';
import { AnswerRating } from './answersRating.model';
import { Role } from '../roles/roles.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService],
  imports: [
    TypeOrmModule.forFeature([Answer, Question, User, AnswerRating, Role]),
    QuestionsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AnswersModule {}
