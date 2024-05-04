import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserDecorator } from './decorators/UserDecorator.decorator';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('admin')
  createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.userService.createAdmin(createUserDto);
  }

  @Post()
  createCustomer(
    @Body() createUserDto: CreateUserDto,
    @UserDecorator() user: User,
  ) {
    return this.userService.createCustomer(createUserDto, user);
  }

  @Get()
  getAll() {
    return this.userService.findAll();
  }
}
