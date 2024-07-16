import { Module } from '@nestjs/common';
import { rentalSlipController, RoomController, UserController } from './http';
import { RentalSlipService, RoomService, UserService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RentalSlip,
  rentalSlipSchema,
  Room,
  RoomSchema,
  User,
  UserSchema,
} from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    MongooseModule.forFeature([
      { name: RentalSlip.name, schema: rentalSlipSchema },
    ]),
  ],
  controllers: [UserController, RoomController, rentalSlipController],
  providers: [UserService, RoomService, RentalSlipService],

  exports: [UserService],
})
export class IdentityModule {}
