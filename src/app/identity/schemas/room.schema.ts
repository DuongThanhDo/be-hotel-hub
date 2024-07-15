import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  @Prop({ required: true, unique: true })
  room_number: string;

  @Prop()
  status: boolean;

  @Prop()
  type: string;

  @Prop()
  price: number;

  @Prop()
  description: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
