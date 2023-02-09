import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/answers/answers.model';
import { Tag } from 'src/tags/tags.model';
import { QuestionsController } from './questions.controller';
import { Question } from './questions.model';
import { QuestionsService } from './questions.service';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [TypeOrmModule.forFeature([Question, Tag, Answer])]
})
export class QuestionsModule {}
