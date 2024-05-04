import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { IsAdmin } from '../user/utils/isAdmin';

@Module({
  controllers: [PlanController],
  providers: [PlanService, IsAdmin],
  imports: [PrismaModule, JwtModule],
})
export class PlanModule {}
