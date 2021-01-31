import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Order } from './entity/order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  private logger = new Logger('OrderRepository');

  // fetch orders
  async fetchOrders(): Promise<Order[]> {
    const query = this.createQueryBuilder();

    try {
      const orders = await query.getMany();
      this.logger.verbose('fetching orders');
      return orders;
    } catch (err) {
      this.logger.error(`failed to fetch orders - ${err.message}`);
      throw new InternalServerErrorException(
        `failed to fetch orders - ${err.message}`,
      );
    }
  }

  // get order by user id
  async getOrder(id: number): Promise<Order> {
    const query = this.createQueryBuilder();

    try {
      const order = await query.where({ id: id }).getOne();
      this.logger.verbose(`retrieving order by id ${id}`);
      return order;
    } catch (err) {
      this.logger.error(`failed to get order by id ${id} - ${err.message}`);
      throw new InternalServerErrorException(
        `failed to get order by id ${id} - ${err.message}`,
      );
    }
  }
}
