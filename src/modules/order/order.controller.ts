import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';
import { NewOrderDto } from './dto/order.dto';

@Controller('api/v1/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async fetchOrders(): Promise<Order[]> {
    return this.orderService.fetchOrders();
  }

  @Get(':id')
  async getOrder(@Param('id') id: number): Promise<Order> {
    return this.orderService.getOrder(id);
  }

  @Post('new')
  async newOrder(@Body() newOrderDto: NewOrderDto): Promise<any> {
    return this.orderService.newOrder(newOrderDto);
  }
}
