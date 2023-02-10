import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/questions/questions.model';
import { User } from 'src/users/users.model';
import { AnswersController } from './answers.controller';
import { Answer } from './answers.model';
import { AnswersService } from './answers.service';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService],
  imports: [TypeOrmModule.forFeature([Answer, Question, User])]
})
export class AnswersModule {}
