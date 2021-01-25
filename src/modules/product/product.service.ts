import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { Product } from './entity/product.entity';
import { NewProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  private logger = new Logger('ProductService');
  constructor(private productRepository: ProductRepository) {}

  // add new product
  async addProduct(newProductDto: NewProductDto): Promise<Product> {
    const { name, amount, type, value, photo } = newProductDto;
    const newProduct = new Product();

    newProduct.name = name;
    newProduct.type = type;
    amount ? (newProduct.amount = amount) : null;
    value ? (newProduct.value = value) : null;
    photo ? (newProduct.photo = photo) : null;

    try {
      await this.productRepository.save(newProduct);
      this.logger.verbose(`new product "${name}" registered`);
      return newProduct;
    } catch (err) {
      this.logger.error(`failed to register new product - ${err.message}`);
      throw new InternalServerErrorException(
        `failed to register new product - ${err.message}`,
      );
    }
  }

  // update product

  // delete product

  // get all products
  async fetchProducts(): Promise<Product[]> {
    return this.productRepository.fetchProducts();
  }

  // get single product by id
  async getProductById(id: string): Promise<Product> {
    return this.productRepository.getProductById(id);
  }

  // get products by user id
  async getProductsByUser(id: string): Promise<Product[]> {
    return this.productRepository.getProductsByUser(id);
  }

  // get products by provider id
  async getProductsByProvider(id: string): Promise<Product[]> {
    return this.productRepository.getProductsByProvider(id);
  }

  // get products by lower amount
  async getProductsLowAmount(): Promise<any> {
    return this.productRepository.getProductsLowAmount();
  }
}
