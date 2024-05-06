import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PetService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPetDto: CreatePetDto, user: User) {
    const data = {
      ...createPetDto,
      userId: user.id,
    };

    const pet = await this.prisma.pet.create({
      data,
    });

    return pet;
  }

  async findAll(user: User) {
    const pets = await this.prisma.pet.findMany({
      where: {
        userId: user.id,
      },
    });
    return pets;
  }

  async findOne(id: string) {
    const pet = await this.prisma.pet.findFirst({
      where: {
        id,
      },
    });

    return pet;
  }

  async update(id: string, updatePetDto: UpdatePetDto, user: User) {
    const data = {
      ...updatePetDto,
      userId: user.id,
    };

    const pet = await this.prisma.pet.update({
      where: {
        id,
      },
      data,
    });

    return pet;
  }

  async remove(id: string) {
    await this.prisma.pet.delete({
      where: {
        id,
      },
    });
  }
}
