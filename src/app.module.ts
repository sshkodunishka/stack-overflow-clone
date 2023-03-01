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
import { AddColumnTag1677060963784 } from 'config/migrations/1677060963784-AddColumnTag';
import { databaseConfig, dbTypesConfig, nodeEnvConstant } from 'config/partitioned-config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `.${nodeEnvConstant}.env`,
      })],
      inject: [ConfigService],
      useFactory: () => ({
        type: dbTypesConfig.POSTGRES,
        username: databaseConfig.POSTGRES_USER,
        password: databaseConfig.POSTGRES_PASSWORD,
        port: databaseConfig.POSTGRES_PORT,
        database: databaseConfig.POSTGRES_DB,
        host: databaseConfig.POSTGRES_HOST,
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
