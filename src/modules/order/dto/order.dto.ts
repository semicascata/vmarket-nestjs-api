import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum Status {
  open = 'open',
  separation = 'separation',
  send = 'send',
  received = 'received',
}

export class NewOrderDto {
  @IsNotEmpty()
  @IsArray()
  products: number[];

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @IsDate()
  @IsNotEmpty()
  deliveryTime: Date;
}
