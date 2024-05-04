import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PetController],
  providers: [PetService],
  imports: [PrismaModule],
})
export class PetModule {}
