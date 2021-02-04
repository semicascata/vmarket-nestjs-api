import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Order } from './entity/order.entity';
import { NewOrderDto, Status } from './dto/order.dto';
import { ProductRepository } from '../product/product.repository';
import * as moment from 'moment';
import { UpdateOrderDto } from './dto/update-order.dto';

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

    // get products
    const allProducts = await Promise.all(
      products.map(async product => {
        // get the product from productRepository
        const oneProd = await this.productRepository.findOne(product.productId);
        await this.productRepository.save(oneProd);
        return {
          productId: oneProd.id,
          howMany: product.howMany,
        };
      }),
    );

    // get values
    const values = await Promise.all(
      products.map(async prod => {
        const prods = await this.productRepository.findOne(prod.productId);

        if (prods.amount < prod.howMany) {
          this.logger.error(`product ${prods.name} out of stock`);
          throw new InternalServerErrorException(
            `product "${prods.name}" out of stock`,
          );
        }
        const totalPerProd = prods.value * prod.howMany;

        return totalPerProd;
      }),
    );

    // sum values
    const total = values.reduce((a, b) => {
      return a + b;
    }, 0);

    // moment
    moment.locale('pt-br');
    const deliveryEntry = moment()
      .add(7, 'days')
      .format('DD-MM-YYYY');

    // Order instance
    order.products = allProducts;
    order.status = Status.open;
    order.total = +total;
    order.deliveryTime = deliveryEntry;

    try {
      await this.orderRepository.save(order);
      this.logger.verbose(
        `order ${order.id} registered, delivery time: ${deliveryEntry}`,
      );
      return order;
    } catch (err) {
      this.logger.error(`failed to register order - ${err.message}`);
      throw new InternalServerErrorException(
        `failed to register order - ${err.message}`,
      );
    }
  }

  // delete order
  async deleteOrder(id: number): Promise<any> {
    const order = await this.orderRepository.findOne(id);

    try {
      await this.orderRepository.remove(order);
      this.logger.verbose(`order by id ${id} removed`);
      return {
        message: 'order removed',
        order,
      };
    } catch (err) {
      this.logger.error(`failed to delete order - ${err.message}`);
      throw new InternalServerErrorException(
        `failed to delete order - ${err.message}`,
      );
    }
  }

  // submit order
  async submitOrder(id: number): Promise<any> {
    const order = await this.orderRepository.findOne(id);
    const prodList = await this.stringParse(order.products);

    prodList.map(async prod => {
      const parseObj = JSON.parse(prod);
      console.log(parseObj);

      const oneProd = await this.productRepository.findOne(parseObj.productId);
      const newValue = oneProd.amount - parseObj.howMany;
      await this.productRepository.update(parseObj.productId, {
        amount: newValue,
      });
    });

    try {
      order.status = Status.separation;

      await this.orderRepository.save(order);

      this.logger.verbose(`order ${id} submited, in separation`);

      return order;
    } catch (err) {
      this.logger.error(`failed to submit order - ${err.message}`);
      throw new InternalServerErrorException(
        `failed to submit order - ${err.message}`,
      );
    }
  }

  // stringify/parse
  async stringParse(obj: any) {
    const stringObj = JSON.stringify(obj);
    const parseObj = JSON.parse(stringObj);
    return parseObj;
  }

  // update order
  async updateOrder(id: number, updateOrderDto: UpdateOrderDto): Promise<any> {
    try {
      await this.orderRepository.update(id, updateOrderDto);
      this.logger.verbose(`order ${id} updated`);
      return {
        orderId: id,
        updatedFields: updateOrderDto,
      };
    } catch (err) {
      this.logger.error(`failed to update order ${id} - ${err.message}`);
      throw new InternalServerErrorException(
        `failed to update order ${id} - ${err.message}`,
      );
    }
  }
}
