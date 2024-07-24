import { CreateRoomDto } from './../dtos/creates/create-room.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from '../entities';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateRoomDto } from '../dtos/updates/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<RoomEntity> {
    return this.roomRepository.save(createRoomDto);
  }

  async findAll(): Promise<RoomEntity[]> {
    return this.roomRepository.find({ relations: ['bookings'] });
  }

  async findById(id: string): Promise<RoomEntity> {
    return this.roomRepository.findOne({
      where: { room_id: id },
      relations: ['bookings'],
    });
  }

  async update(
    id: string,
    updateRoomDto: UpdateRoomDto,
  ): Promise<UpdateResult> {
    return this.roomRepository.update(id, updateRoomDto);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.roomRepository.delete(id);
  }
}
