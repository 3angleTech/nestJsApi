import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('db', () => ({
  type: 'postgres',
  logging: process.env.DB_LOGS,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
}));
