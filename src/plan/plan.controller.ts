import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import { UserDecorator } from 'src/user/decorators/UserDecorator.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  create(@Body() createPlanDto: CreatePlanDto, @UserDecorator() user: User) {
    return this.planService.create(createPlanDto, user);
  }

  @Get()
  findAll() {
    return this.planService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanDto: UpdatePlanDto,
    @UserDecorator() user: User,
  ) {
    return this.planService.update(id, updatePlanDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @UserDecorator() user: User) {
    return this.planService.remove(id, user);
  }
}
