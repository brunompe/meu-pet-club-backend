import { IsString } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  name: string;

  @IsString()
  details: string;

  @IsString()
  value: string;

  @IsString()
  userId: string;
}
