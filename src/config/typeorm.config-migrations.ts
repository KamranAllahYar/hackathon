import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'hackathon',
  synchronize: false,
  entities: [__dirname + '/../api/entities/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  logging: true,
  autoLoadEntities: true,
};

export const AppDataSource = new DataSource(typeOrmConfig as DataSourceOptions);
