import { Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './entity/order.entity';
import { NewOrderDto } from './dto/order.dto';
import { ProductRepository } from '../product/product.repository';

@Injectable()
export class OrderService {
  private logger = new Logger('OrderService');

  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository,
  ) {}

  // fetch orders
  async fetchOrders(): Promise<Order[]> {
    return this.orderRepository.fetchOrders();
  }

  // get order by id
  async getOrder(id: number): Promise<Order> {
    return this.orderRepository.getOrder(id);
  }

  // register order
  async newOrder(newOrderDto: NewOrderDto): Promise<any> {
    const { products } = newOrderDto;

    // "Promise.all" returns a promise that resolves when all of the promises in the iterable argument have resolved
    const allProducts = await Promise.all(
      products.map(async product => {
        // get the product from productRepository
        const oneProd = await this.productRepository.findOne(product.productId);
        const total = oneProd.value * product.howMany;

        return {
          productInOrder: oneProd.name,
          valuePerUnit: oneProd.value,
          quantityPerProduct: product.howMany,
          total: +total.toFixed(2),
        };
      }),
    );

    const total = allProducts.reduce((a, b) => {
      return a + b.total;
    }, 0);

    return {
      allProducts,
      total,
    };
  }

  // update order

  // delete order

  // submit order
}
