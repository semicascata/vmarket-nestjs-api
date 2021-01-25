import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';
import { NewProductDto } from './dto/product.dto';

@Controller('/api/v1/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async fetchProducts(): Promise<Product[]> {
    return this.productService.fetchProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Get('user/:id')
  async getProductsByUser(@Param('id') id: string): Promise<Product[]> {
    return this.productService.getProductsByUser(id);
  }

  @Get('provider/:id')
  async getProductsByProvider(@Param('id') id: string): Promise<Product[]> {
    return this.productService.getProductsByProvider(id);
  }

  @Get('checkamount')
  async getProductsLowAmount(): Promise<any> {
    return this.productService.getProductsLowAmount();
  }

  @Post()
  async addProduct(@Body() newProductDto: NewProductDto): Promise<Product> {
    return this.productService.addProduct(newProductDto);
  }
}
