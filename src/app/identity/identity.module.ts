import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BookingEntity,
  CustomerEntity,
  PaymentEntity,
  ProfileEntity,
  RoomEntity,
  StaffEntity,
  UserEntity,
} from './entities';
import { AuthModule } from '../auth/auth.module';
import {
  CustomerController,
  ProfileController,
  RoomController,
  StaffController,
  UserController,
} from './http';
import {
  CustomerService,
  ProfileService,
  RoomService,
  StaffService,
  UserService,
} from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerEntity,
      UserEntity,
      StaffEntity,
      RoomEntity,
      BookingEntity,
      PaymentEntity,
      ProfileEntity,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [
    UserController,
    CustomerController,
    StaffController,
    ProfileController,
    RoomController,
  ],
  providers: [
    UserService,
    CustomerService,
    ProfileService,
    StaffService,
    RoomService,
  ],
  exports: [UserService],
})
export class IdentityModule {}
