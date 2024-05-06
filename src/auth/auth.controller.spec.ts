import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { IsAdmin } from '../user/utils/isAdmin';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, JwtService, UserService, PrismaService, IsAdmin],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });
});
