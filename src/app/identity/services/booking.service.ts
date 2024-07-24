import { CustomerService } from './customer.service';
import { UpdateBookingDto } from './../dtos/updates/update-booking.dto';
import { CreateBookingDto } from './../dtos/creates/create-booking.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity, RoomEntity } from '../entities';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { RoomService } from './room.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private bookingRepository: Repository<BookingEntity>,
    private customerService: CustomerService,
    private roomService: RoomService,
  ) {}

  async create(
    createBookingDto: CreateBookingDto,
    customer_id: string,
    rooms_id: [room_id: string],
  ): Promise<BookingEntity | null> {
    const customer = await this.customerService.findById(customer_id);
    if (!customer) return null;

    const rooms: RoomEntity[] = [];

    rooms_id.map(async (room_id) => {
      const room = await this.roomService.findById(room_id);
      if (!room) return null;
      rooms.push(room);
    });

    return this.bookingRepository.save({
      ...createBookingDto,
      customer,
      rooms,
    });
  }

  async findAll(): Promise<BookingEntity[]> {
    return this.bookingRepository.find({
      relations: ['customer', 'rooms', 'payments'],
    });
  }

  async findById(id: string): Promise<BookingEntity> {
    return this.bookingRepository.findOne({
      where: { booking_id: id },
      relations: ['customer', 'rooms', 'payments'],
    });
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<UpdateResult> {
    return this.bookingRepository.update(id, updateBookingDto);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.bookingRepository.delete(id);
  }
}
