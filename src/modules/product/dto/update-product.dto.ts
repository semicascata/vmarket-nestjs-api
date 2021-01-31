import { IsEnum, IsOptional } from 'class-validator';
import { Type } from './product.dto';

export class UpdateProductDto {
  @IsOptional()
  name: string;
  amount: number;
  value: number;
  photo: string;

  @IsOptional()
  @IsEnum(Type)
  type: Type;
}
