import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/answers/answers.model';
import { AuthModule } from 'src/auth/auth.module';
import { Tag } from 'src/tags/tags.model';
import { TagsModule } from 'src/tags/tags.module';
import { User } from 'src/users/users.model';
import { QuestionsController } from './questions.controller';
import { Question } from './questions.model';
import { QuestionsService } from './questions.service';
import { QuestionRating } from './questionsRating.model';
import { Role } from '../roles/roles.model';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Question,
      Tag,
      Answer,
      User,
      QuestionRating,
      Role,
    ]),
    TagsModule,
    AuthModule,
    RolesModule,
  ],
  providers: [QuestionsService],
  controllers: [QuestionsController],
  exports: [QuestionsService],
})
export class QuestionsModule {}
