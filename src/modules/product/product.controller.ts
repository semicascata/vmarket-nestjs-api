import { Role } from './../auth/dto/new-user.dto';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Product } from './entity/product.entity';
import { ProductService } from './product.service';
import { NewProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthRole } from 'src/common/decorators/role.decorator';

@UseGuards(AuthGuard('jwt'))
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
  @AuthRole(Role.admin, Role.user)
  async getProductsByUser(@Param('id') id: string): Promise<Product[]> {
    return this.productService.getProductsByUser(id);
  }

  @Get('provider/:id')
  async getProductsByProvider(@Param('id') id: string): Promise<Product[]> {
    return this.productService.getProductsByProvider(id);
  }

  @Get('checkamount')
  @AuthRole(Role.admin, Role.user)
  async getProductsLowAmount(): Promise<any> {
    return this.productService.getProductsLowAmount();
  }

  @Post()
  @AuthRole(Role.admin, Role.user)
  async addProduct(@Body() newProductDto: NewProductDto): Promise<Product> {
    return this.productService.addProduct(newProductDto);
  }

  @Put('update/:id')
  @AuthRole(Role.admin, Role.user)
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(updateProductDto, id);
  }

  @Delete('del/:id')
  @AuthRole(Role.admin, Role.user)
  async deleteProduct(@Param('id') id: string): Promise<any> {
    return this.productService.deleteProduct(id);
  }
}
