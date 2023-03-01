export interface Config {
  nest: NestConfig;
  database: DatabaseConfig;
  dbTypes: DBTypesConfig;
  envs: ENVSConfig;
  nodeEnv: string;
  redis: RedisConfig;
}

export interface NestConfig {
  PORT: number;
}

export interface DatabaseConfig {
  POSTGRES_DB: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_USER: string;
  POSTGRES_PORT: number;
  POSTGRES_HOST: string;
}

export interface DBTypesConfig {
  POSTGRES: 'postgres';
}

export interface ENVSConfig {
  DEVELOPMENT: string;
  PRODUCTION: string;
  LOCAL: string;
}

export interface RedisConfig {
  REDIS_HOST: string;
  REDIS_PORT: number;
}