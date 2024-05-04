import { Injectable } from '@nestjs/common';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import { PrismaService } from 'src/prisma/prisma.service';
import { IsNotAdminError } from 'src/user/errors/IsNotAdminError';
import { IsAdmin } from 'src/user/utils/isAdmin';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { UserDecorator } from 'src/user/decorators/UserDecorator.decorator';
import { User } from 'src/user/entities/user.entity';
import { UnauthorizedError } from 'src/auth/errors/unauthorized.error';

@Injectable()
export class PlanService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly isAdmin: IsAdmin,
  ) {}

  async create(createPlanDto: CreatePlanDto, @UserDecorator() user: User) {
    const hasAdminPrivileges = await this.isAdmin.isAdmin(user);

    if (hasAdminPrivileges) {
      const plan = await this.prisma.plan.create({
        data: createPlanDto,
      });

      return plan;
    } else {
      throw new UnauthorizedError("You can't Create!");
    }
  }

  async findAll() {
    const plans = await this.prisma.plan.findMany();

    return plans;
  }

  async findOne(id: string) {
    const plan = await this.prisma.plan.findFirst({
      where: {
        id,
      },
    });

    return plan;
  }

  async update(id: string, updatePlanDto: UpdatePlanDto, user: User) {
    const hasAdminPrivileges = this.isAdmin.isAdmin(user);

    if (hasAdminPrivileges) {
      const plan = await this.prisma.plan.update({
        where: {
          id,
        },
        data: updatePlanDto,
      });

      return plan;
    } else {
      throw new UnauthorizedError("You can't Update!");
    }
  }

  async remove(id: string, user: User) {
    const hasAdminPrivileges = this.isAdmin.isAdmin(user);

    if (hasAdminPrivileges) {
      await this.prisma.plan.delete({
        where: {
          id,
        },
      });
    } else {
      throw new UnauthorizedError("You can't Delete!");
    }
  }
}
