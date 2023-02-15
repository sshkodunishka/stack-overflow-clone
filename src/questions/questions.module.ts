import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/answers/answers.model';
import { Tag } from 'src/tags/tags.model';
import { TagsModule } from 'src/tags/tags.module';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { QuestionsController } from './questions.controller';
import { Question } from './questions.model';
import { QuestionsService } from './questions.service';
import { QuestionRating } from './questionsRating.model';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Tag, Answer, User, QuestionRating]), TagsModule, UsersModule],
  providers: [QuestionsService],
  controllers: [QuestionsController],
  exports: [QuestionsService]
})
export class QuestionsModule {}
