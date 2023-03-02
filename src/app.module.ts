/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'users/users.module';
import { AuthModule } from 'auth/auth.module';
import { TagsModule } from 'tags/tags.module';
import { QuestionsModule } from 'questions/questions.module';
import { AnswersModule } from 'answers/answers.module';
import { RedisModule } from 'redis/redis.module';
import { RolesModule } from 'roles/roles.module';
import { AddColumnTag1677060963784 } from '../migrations/1677060963784-AddColumnTag';
import { dbTypesConfig } from '../config/partitioned-config';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`,
      })],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: dbTypesConfig.POSTGRES,
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        port: +configService.get('POSTGRES_PORT'),
        database: configService.get('POSTGRES_DB'),
        host: configService.get('POSTGRES_HOST'),
        entities: [],
        autoLoadEntities: true,
        migrations: [AddColumnTag1677060963784]
      })
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
