import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import { JwtService } from '@nestjs/jwt';
import { IsNotAdminError } from './errors/IsNotAdminError';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
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
    req: AuthRequest,
  ): Promise<User> {
    const isAdmin = this.isAdmin(req);

    if (isAdmin) {
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

  isAdmin(req: AuthRequest) {
    const authToken = req.headers['authorization'].split(' ')[1];
    const reqUserRoles = this.jwtService.decode(authToken).roles;
    const hasAdminRole = reqUserRoles.some(
      (role) => role.toLowerCase() === 'administrador',
    );

    if (hasAdminRole) {
      return true;
    } else {
      return false;
    }
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findAll() {
    return this.prisma.user.findMany();
  }
}
