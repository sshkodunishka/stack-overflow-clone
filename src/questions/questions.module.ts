import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../answers/answers.model';
import { AuthModule } from '../auth/auth.module';
import { Tag } from '../tags/tags.model';
import { TagsModule } from '../tags/tags.module';
import { User } from '../users/users.model';
import { QuestionsController } from './questions.controller';
import { Question } from './questions.model';
import { QuestionsService } from './questions.service';
import { Role } from '../roles/roles.model';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Tag, Answer, User, Role]),
    TagsModule,
    AuthModule,
    RolesModule,
  ],
  providers: [QuestionsService],
  controllers: [QuestionsController],
  exports: [QuestionsService],
})
export class QuestionsModule {}
