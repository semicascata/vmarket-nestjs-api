import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { ProductRepository } from '../product/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository, ProductRepository])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
