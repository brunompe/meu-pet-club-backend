import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { UserDecorator } from '../user/decorators/user.decorator';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlanService } from './plan.service';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  create(@Body() createPlanDto: CreatePlanDto, @UserDecorator() user: User) {
    return this.planService.create(createPlanDto, user);
  }

  @Get()
  findAll(@UserDecorator() user: User) {
    return this.planService.findAll(user);
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
