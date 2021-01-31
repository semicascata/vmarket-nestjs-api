import { IsEmail, IsOptional, IsPhoneNumber, MaxLength } from 'class-validator';

export class UpdateProviderDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @MaxLength(2)
  state: string;

  @IsOptional()
  city: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber(null)
  contact1: string;

  @IsOptional()
  @IsPhoneNumber(null)
  contact2: string;
}
