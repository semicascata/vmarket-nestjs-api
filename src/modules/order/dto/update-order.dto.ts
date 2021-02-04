import { IsEnum, IsOptional } from 'class-validator';
import { Status } from './order.dto';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  deliveryTime: string;
}
