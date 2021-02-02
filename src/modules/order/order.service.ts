import { Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './entity/order.entity';
import { NewOrderDto, Status } from './dto/order.dto';
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
  async newOrder(newOrderDto: NewOrderDto): Promise<Order> {
    const { products } = newOrderDto;
    const order = new Order();

    // "Promise.all" returns a promise that resolves when all of the promises in the iterable argument have resolved
    const allProducts = await Promise.all(
      products.map(async product => {
        // get the product from productRepository
        const oneProd = await this.productRepository.findOne(product.productId);
        // const total = oneProd.value * product.howMany;

        return {
          productId: oneProd.id,
          howMany: product.howMany,
        };
        // return {
        //   prodId: oneProd.id,
        //   quantityPerProduct: product.howMany,
        //   productInOrder: oneProd.name,
        //   valuePerUnit: oneProd.value,
        //   total: +total.toFixed(2),
        // };
      }),
    );

    // const total = allProducts.reduce((a, b) => {
    //   return a + b.total;
    // }, 0);

    order.products = allProducts;
    order.status = Status.open;

    return order;
  }

  // update order

  // delete order

  // submit order
}
