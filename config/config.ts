import { ConfigService } from '@nestjs/config';
import { Config } from './config.interface';

export const configService = new ConfigService<IConfigService>();

interface IConfigService {
  PORT: number;
  POSTGRES_DB: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_USER: string;
  POSTGRES_PORT: number;
  POSTGRES_HOST: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  NODE_ENV: string;
}

export const configs = (): Config => ({
  nest: {
    PORT: Number(configService.get('PORT')),
  },
  database: {
    POSTGRES_DB: configService.get('POSTGRES_DB'),
    POSTGRES_HOST: configService.get('POSTGRES_HOST'),
    POSTGRES_PASSWORD: configService.get('POSTGRES_PASSWORD'),
    POSTGRES_PORT: Number(configService.get('POSTGRES_PORT')),
    POSTGRES_USER: configService.get('POSTGRES_USER'),
  },
  dbTypes: {
    POSTGRES: 'postgres',
  },
  envs: {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
    LOCAL: 'local'
  },
  nodeEnv: configService.get('NODE_ENV'),
  redis: {
    REDIS_HOST: configService.get('REDIS_HOST'),
    REDIS_PORT: Number(configService.get('REDIS_PORT')),
  }
});