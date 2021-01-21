import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import { Product } from '../../modules/product/entity/product.entity';
import {
  tpType,
  tpHost,
  tpPort,
  tpUsername,
  tpPassword,
  tpDatabase,
} from '../env/env.config';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  private logger = new Logger('database');

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const options: any = {
      type: tpType,
      host: tpHost,
      port: tpPort,
      username: tpUsername,
      password: tpPassword,
      database: tpDatabase,
      entities: [Product],
      synchronize: true,
    } as TypeOrmModuleOptions;

    try {
      createConnection(options);
      this.logger.log('>_ database connected');
    } catch (err) {
      this.logger.error(`database error - ${err.message}`);
      throw new InternalServerErrorException(`database error - ${err.message}`);
    }
    return options;
  }
}
