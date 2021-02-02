import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum Status {
  open = 'open',
  separation = 'separation',
  send = 'send',
  received = 'received',
}

export interface ProductsOrder {
  productId: number;
  howMany: number;
}

export class NewOrderDto {
  @IsNotEmpty()
  @IsArray()
  products: ProductsOrder[];

  // @IsNumber()
  // @IsNotEmpty()
  // total: number;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  // @IsDate()
  // @IsNotEmpty()
  // deliveryTime: Date;
}
