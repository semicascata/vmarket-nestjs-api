import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, LessThanOrEqual, Repository } from 'typeorm';
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

  // get single product by id
  async getProductById(id: string): Promise<Product> {
    const query = this.createQueryBuilder();

    try {
      const product = await query.where({ id: id }).getOne();
      this.logger.verbose(`returning product "${product.name}" by Id: ${id}`);
      return product;
    } catch (err) {
      this.logger.error(
        `failed to retrieve product by Id: ${id} - ${err.message}`,
      );
      throw new InternalServerErrorException(
        `failed to retrieve product by Id: ${id} - ${err.message}`,
      );
    }
  }

  // get products by user id
  async getProductsByUser(id: string): Promise<Product[]> {
    const query = this.createQueryBuilder();

    try {
      const productsByUser = await query.where({ _user: id }).getMany();
      return productsByUser;
    } catch (err) {
      this.logger.error(
        `failed to get products by user Id: ${id} - ${err.message}`,
      );
      throw new InternalServerErrorException(
        `failed to get products by user Id: ${id} - ${err.message}`,
      );
    }
  }

  // get products by provider id
  async getProductsByProvider(id: string): Promise<Product[]> {
    const query = this.createQueryBuilder();

    try {
      const productsByProvider = await query.where({ _provider: id }).getMany();
      return productsByProvider;
    } catch (err) {
      this.logger.error(
        `failed to get products by provider Id: ${id} - ${err.message}`,
      );
      throw new InternalServerErrorException(
        `failed to get products by provider Id: ${id} - ${err.message}`,
      );
    }
  }

  // get products by lower amount
  async getProductsLowAmount(): Promise<any> {
    const query = this.createQueryBuilder();

    try {
      const productsLowAmount = await query
        .where({ amount: LessThanOrEqual(100) })
        .getMany();

      if (productsLowAmount.length === 0) {
        this.logger.verbose('everything is cool');
        return {
          products: productsLowAmount.length,
          message: 'no products on low stock',
        };
      }

      this.logger.verbose(
        `returning products on low stock, products = ${productsLowAmount.length}`,
      );
      return {
        productsCount: productsLowAmount.length,
        productsLowAmount,
      };
    } catch (err) {
      this.logger.error(
        `failed to fetch products on low stock - ${err.message}`,
      );
      throw new InternalServerErrorException(
        `failed to fetch products on low stock - ${err.message}`,
      );
    }
  }
}
