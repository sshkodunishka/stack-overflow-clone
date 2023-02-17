/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { Tag } from './tags/tags.model';
import { RedisModule } from './redis/redis.module';
import { RolesModule } from './roles/roles.module';
import { Question } from './questions/questions.model';
import { Answer } from './answers/answers.model';
import { Role } from './roles/roles.model';
import { QuestionRating } from './questions/questionsRating.model';
import { AnswerRating } from './answers/answersRating.model';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Question, User, Tag, Answer, Role, QuestionRating, AnswerRating],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TagsModule,
    QuestionsModule,
    AnswersModule,
    RedisModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
