import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Product } from './entity/product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private logger = new Logger('ProductRepository');

  // get all products
  async fetchProducts(): Promise<Product[]> {
    const query = this.createQueryBuilder();

    try {
      const products = await query.getMany();
      this.logger.verbose('fetching products');

      return products;
    } catch (err) {
      this.logger.error(`error fetching products - ${err.message}`);
      throw new InternalServerErrorException(
        `error fetching products - ${err.message}`,
      );
    }
  }

  // get products by lower amount

  // get single product by id

  // get products by user id

  // get products by provider id
}
