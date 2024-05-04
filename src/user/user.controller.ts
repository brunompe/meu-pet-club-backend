import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('admin')
  createAdmin(
    @Body() createUserDto: CreateUserDto,
    @Request() req: AuthRequest,
  ) {
    return this.userService.createAdmin(createUserDto);
  }

  @Post()
  createCustomer(
    @Body() createUserDto: CreateUserDto,
    @Request() req: AuthRequest,
  ) {
    return this.userService.createCustomer(createUserDto, req);
  }

  @Get()
  getAll() {
    return this.userService.findAll();
  }
}
