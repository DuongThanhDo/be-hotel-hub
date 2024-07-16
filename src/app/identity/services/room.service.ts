import { UpdateRoomDto } from './../dtos/room_dtos/update-room.dto';
import { CreateRoomDto } from './../dtos/room_dtos/create-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { Room, RoomDocument } from '../schemas';
import { Model } from 'mongoose';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<RoomDocument> {
    const room = await this.findByRoomNumber(createRoomDto.room_number);

    if (room) throw new HttpException('Da ton tai phong!', 404);

    const newRoom = new this.roomModel(createRoomDto);
    return newRoom.save();
  }

  async findAll(): Promise<RoomDocument[]> {
    return this.roomModel.find().exec();
  }

  async findById(id: string): Promise<RoomDocument | null> {
    const room = await this.roomModel.findOne({ _id: id });
    if (!room) return null;
    return room;
  }

  async findByRoomNumber(room_number: string): Promise<RoomDocument | null> {
    const room = await this.roomModel.findOne({ room_number: room_number });
    if (!room) return null;
    return room;
  }

  async update(
    id: string,
    updateRoomDto: UpdateRoomDto,
  ): Promise<RoomDocument | boolean> {
    return this.roomModel.findByIdAndUpdate(id, updateRoomDto, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    this.roomModel.findByIdAndDelete(id).exec();

    return true;
  }

  async totalAmount(rooms: string[]): Promise<number> {
    let totalAmount = 0;
    for (const roomNumber of rooms) {
      const room = await this.findByRoomNumber(roomNumber);

      if (room && room.price) {
        totalAmount += room.price;
      }
    }

    return totalAmount;
  }
}
