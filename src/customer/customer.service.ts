import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.prisma.customer.createMany({
      data: createCustomerDto,
    });

    return customer;
  }

  async findAll() {
    const customers = await this.prisma.customer.findMany();

    return customers;
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id,
      },
    });

    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.prisma.customer.update({
      where: {
        id,
      },
      data: updateCustomerDto,
    });

    return customer;
  }

  async remove(id: string) {
    return this.prisma.customer.delete({
      where: {
        id,
      },
    });
  }
}
