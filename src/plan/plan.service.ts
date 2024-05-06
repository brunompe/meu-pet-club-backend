import { Injectable } from '@nestjs/common';
import { UnauthorizedError } from 'src/auth/errors/unauthorized.error';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { IsAdmin } from 'src/user/utils/isAdmin';
import { UserDecorator } from '../user/decorators/user.decorator';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

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

  async findAll(user: User) {
    const plans = await this.prisma.plan.findMany({
      where: {
        userId: user.id,
      },
    });

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
