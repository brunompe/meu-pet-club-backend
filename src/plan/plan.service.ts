import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlanService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPlanDto: CreatePlanDto) {
    const plan = await this.prisma.plan.create({
      data: createPlanDto,
    });

    return plan;
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

  async update(id: string, updatePlanDto: UpdatePlanDto) {
    const plan = await this.prisma.plan.update({
      where: {
        id,
      },
      data: updatePlanDto,
    });
  }

  async remove(id: string) {
    await this.prisma.plan.delete({
      where: {
        id,
      },
    });
  }
}
