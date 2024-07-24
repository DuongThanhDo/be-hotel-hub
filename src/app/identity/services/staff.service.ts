import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffEntity, UserEntity } from '../entities';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<StaffEntity[] | null> {
    const staffs = await this.staffRepository.find({
      relations: ['user'],
    });
    return staffs;
  }

  async findById(id: string): Promise<StaffEntity | null> {
    const staff = await this.staffRepository.findOne({
      where: { staff_id: id },
      relations: ['user'],
    });

    if (!staff) return null;

    return staff;
  }

  async update(id: string, position: string): Promise<StaffEntity | null> {
    const user = await this.userRepository.findOne({
      where: { user_id: id },
    });

    if (!user) return null;

    const staff = await this.staffRepository.findOne({
      where: { user },
    });

    if (staff) {
      await this.staffRepository.update(staff.staff_id, { position });
      return this.findById(staff.staff_id);
    } else {
      const newStaff = new StaffEntity();
      newStaff.position = position;
      newStaff.user = user;

      this.staffRepository.save(newStaff);
      return this.findById(staff.staff_id);
    }
  }
}
