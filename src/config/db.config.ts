/* eslint-disable no-console */
import { registerAs } from '@nestjs/config';
import { join } from 'path';

export interface DBConfiguration {
  type: string,
  logging: string,
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
  synchronize: boolean,
  entities: string[],
}

console.log('process.env.DB_LOGS', process.env.DB_LOGS);
console.log('process.env.POSTGRES_HOST', process.env.POSTGRES_HOST);
console.log('process.env.POSTGRES_PORT', process.env.POSTGRES_PORT);
console.log('process.env.POSTGRES_USER', process.env.POSTGRES_USER);

export default registerAs('db', (): DBConfiguration => {
  return {
    type: 'postgres',
    logging: process.env.DB_LOGS as string,
    host: process.env.POSTGRES_HOST as string,
    port: Number(process.env.POSTGRES_PORT as string),
    username: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DB as string,
    synchronize: false,
    entities: [
      join(__dirname, '/../**/*.entity{.ts,.js}'),
    ],
  };
});
