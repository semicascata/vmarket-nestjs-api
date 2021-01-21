import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export enum Type {
  vegetables = 'vegetables', // vegetais
  fruits = 'fruits', // frutas
  inputs = 'inputs', // insumos
}

export class NewProductDto {
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsOptional()
  amount: number;

  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;

  @IsOptional()
  value: number;

  @IsOptional()
  photo: string;

  // @IsOptional()
  // _provider: Provider;

  // @IsOptional()
  // _user: User;
}
