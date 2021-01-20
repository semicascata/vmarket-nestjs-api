import { ProductController } from './product.controller';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
