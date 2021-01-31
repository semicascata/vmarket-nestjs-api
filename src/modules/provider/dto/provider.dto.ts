import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
} from 'class-validator';

export class NewProviderDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MaxLength(2)
  state: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber(null)
  contact1: string;

  @IsOptional()
  @IsPhoneNumber(null)
  contact2: string;
}
