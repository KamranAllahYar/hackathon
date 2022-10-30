import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule.forRoot()],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      entities: [__dirname + '/../api/entities/*.entity.{js,ts}'],
      // migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      logging: false,
      autoLoadEntities: true,
    };
  },
};
