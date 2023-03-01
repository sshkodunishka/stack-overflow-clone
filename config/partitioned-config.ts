import { configs } from './config';
import {
  DatabaseConfig,
  DBTypesConfig,
  ENVSConfig,
  NestConfig,
  RedisConfig
} from './config.interface';

const {
  database,
  redis,
  dbTypes,
  envs,
  nest,
  nodeEnv,
} = configs();

export const databaseConfig: DatabaseConfig = database;

export const redisConfig: RedisConfig = redis;

export const envsConfig: ENVSConfig = envs;

export const nestConfig: NestConfig = nest;

export const dbTypesConfig: DBTypesConfig = dbTypes;

export const nodeEnvConstant: string = nodeEnv;

console.log(database)