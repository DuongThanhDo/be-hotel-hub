import { Module } from '@nestjs/common';
import { RoomController, UserController } from './http';
import { RoomService, UserService } from './services';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema, User, UserSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  controllers: [UserController, RoomController],
  providers: [UserService, RoomService],
})
export class IdentityModule {}
