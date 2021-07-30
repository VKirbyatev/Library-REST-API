import { ITypeOrmConfig } from './typeorm-config.interface';

export class ApiConfigService {
  get typeOrmConfig(): ITypeOrmConfig {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [__dirname, '../**/*.entity.js'],
    };
  }
}
