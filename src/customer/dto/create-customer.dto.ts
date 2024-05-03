import { IsOptional, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  userId: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  plan?: string;
}
