import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';
import { Room } from './room.schema';
import { Document } from 'mongoose';

export type RentalSlipDocument = Room & Document;

@Schema()
export class RentalSlip {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  customer: User;

  @Prop()
  rooms: string[];

  @Prop({ default: Date.now, required: true })
  rentalDate: Date;

  @Prop({ required: true })
  daysOfStay: number;

  @Prop({ required: true })
  expectedDate: Date;

  @Prop()
  returnDate: Date;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: false, required: true })
  payment: boolean;
}

export const rentalSlipSchema = SchemaFactory.createForClass(RentalSlip);
