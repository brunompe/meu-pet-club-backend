import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { IsNotAdminError } from './errors/IsNotAdminError';
import { IsAdmin } from './utils/isAdmin';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly isAdmin: IsAdmin,
  ) {}

  async createAdmin(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      roles: ['ADMINISTRADOR'],
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async createCustomer(
    createUserDto: CreateUserDto,
    user: User,
  ): Promise<User> {
    const hasAdminPrivileges = this.isAdmin.isAdmin(user);

    if (hasAdminPrivileges) {
      const data: Prisma.UserCreateInput = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
        roles: ['CLIENTE'],
      };

      const createdUser = await this.prisma.user.create({ data });

      return {
        ...createdUser,
        password: undefined,
      };
    } else {
      throw new IsNotAdminError("This user doesn't have permission to Create");
    }
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findAll() {
    return this.prisma.user.findMany();
  }
}
