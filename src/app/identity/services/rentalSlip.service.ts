import { RoomService } from './room.service';
import { CreateRentalSlipDto } from './../dtos/rentalSlip_dtos/create-rentalSlip.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
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
      console.log(createRentalSlipDto);
      if (!createRentalSlipDto || !createRentalSlipDto.rooms) {
        throw new BadRequestException('Invalid createRentalSlipDto');
      }

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
}
