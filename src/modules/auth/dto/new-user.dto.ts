import {
  IsEmail,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum Role {
  admin = 'admin',
  user = 'user',
  costumer = 'costumer',
}

export class NewUserDto {
  @IsNotEmpty()
  @IsLowercase()
  @MinLength(4)
  @MaxLength(30)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  confirmPassword: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}
