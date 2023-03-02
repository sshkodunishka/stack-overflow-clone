import { AuthModule } from 'auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'questions/questions.model';
import { TagsController } from './tags.controller';
import { Tag } from './tags.model';
import { TagsService } from './tags.service';
import { Role } from 'roles/roles.model';
import { RolesModule } from 'roles/roles.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [
    TypeOrmModule.forFeature([Tag, Question, Role]),
    AuthModule,
    RolesModule,
  ],
  exports: [TagsService],
})
export class TagsModule {}
