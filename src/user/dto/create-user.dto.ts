import { UserType } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsOptional()
  id: string;

  @IsOptional()
  userId: string;

  @IsOptional()
  phone: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  roles: UserType[] = ['ADMINISTRADOR'];
}
