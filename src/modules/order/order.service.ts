import { Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './entity/order.entity';

@Injectable()
export class OrderService {
  private logger = new Logger('OrderService');

  constructor(private orderRepository: OrderRepository) {}

  // fetch orders
  async fetchOrders(): Promise<Order[]> {
    return this.orderRepository.fetchOrders();
  }

  // get order by id
  async getOrder(id: number): Promise<Order> {
    return this.orderRepository.getOrder(id);
  }

  // register order

  // update order

  // delete order

  // submit order
}
