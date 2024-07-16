import { UpdateRentalSlipDto } from './../dtos/rentalSlip_dtos/update-rentalSlip.dto';
import { RoomService } from './room.service';
import { CreateRentalSlipDto } from './../dtos/rentalSlip_dtos/create-rentalSlip.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RentalSlip, RentalSlipDocument } from '../schemas';
import { Model } from 'mongoose';

@Injectable()
export class RentalSlipService {
  constructor(
    @InjectModel(RentalSlip.name)
    private readonly rentalSlipModel: Model<RentalSlipDocument>,
    private roomService: RoomService,
  ) {}

  async create(
    createRentalSlipDto: CreateRentalSlipDto,
  ): Promise<RentalSlipDocument> {
    try {
      const totalAmount = await this.roomService.totalAmount(
        createRentalSlipDto.rooms,
      );

      createRentalSlipDto.expectedDate = new Date();

      createRentalSlipDto.expectedDate.setDate(
        createRentalSlipDto.expectedDate.getDate() +
          createRentalSlipDto.daysOfStay,
      );

      createRentalSlipDto.totalAmount = totalAmount;

      const newRentalSlip = new this.rentalSlipModel(createRentalSlipDto);

      return newRentalSlip.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll(): Promise<RentalSlipDocument[]> {
    return this.rentalSlipModel.find().exec();
  }

  async findById(id: string): Promise<RentalSlipDocument> {
    return this.rentalSlipModel.findById({ _id: id }).exec();
  }

  async update(
    id: string,
    updateRentalSlipDto: UpdateRentalSlipDto,
  ): Promise<RentalSlipDocument | null> {
    return this.rentalSlipModel.findOneAndUpdate(
      { _id: id },
      updateRentalSlipDto,
      {
        new: true,
      },
    );
  }
  async delete(id: string): Promise<RentalSlipDocument | boolean> {
    return this.rentalSlipModel.findByIdAndDelete({ _id: id });
  }
}
