/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { RedisModule } from './redis/redis.module';
import { RolesModule } from './roles/roles.module';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AddColumnTag1677060963784 } from 'config/migrations/1677060963784-AddColumnTag';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
      })],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
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
  providers: [AppService,{provide: APP_GUARD,
    useClass: JwtAuthGuard,},  JwtAuthGuard,],
})

export class AppModule {}
