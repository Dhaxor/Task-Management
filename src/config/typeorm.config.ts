import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '543543iluvu',
  database: 'taskmanagement',
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
  synchronize: true,
};
