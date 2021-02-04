import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Order } from './entity/order.entity';
import { OrderService } from './order.service';
import { NewOrderDto } from './dto/order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

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

  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<any> {
    return this.orderService.deleteOrder(id);
  }

  @Put('submit/:id')
  async submitOrder(@Param('id') id: number): Promise<any> {
    return this.orderService.submitOrder(id);
  }

  @Put('update/:id')
  async updateOrder(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<any> {
    return this.orderService.updateOrder(id, updateOrderDto);
  }
}
