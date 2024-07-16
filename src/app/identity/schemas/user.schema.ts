import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email?: string;

  @Prop({ required: true })
  passwordHash?: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  address?: string;

  @Prop()
  state?: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;

  @Prop({
    required: true,
    enum: ['admin', 'staff', 'customer'],
    immutable: true,
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
