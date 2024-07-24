import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity, UserEntity } from '../entities';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<CustomerEntity[] | null> {
    const customers = await this.customerRepository.find({
      relations: ['user'],
    });
    return customers;
  }

  async findById(id: string): Promise<CustomerEntity | null> {
    const customer = await this.customerRepository.findOne({
      where: { customer_id: id },
      relations: ['user'],
    });

    if (!customer) return null;

    return customer;
  }

  async update(id: string, dob: Date): Promise<CustomerEntity | null> {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
    });

    if (!user) return null;

    const customer = await this.customerRepository.findOne({
      where: { user },
    });

    if (customer) {
      await this.customerRepository.update(customer.customer_id, { dob });
      return this.findById(customer.customer_id);
    } else {
      const newCustomer = new CustomerEntity();
      newCustomer.dob = dob;
      newCustomer.user = user;

      this.customerRepository.save(newCustomer);
      return this.findById(customer.customer_id);
    }
  }
}
