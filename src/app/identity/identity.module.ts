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
  BookingController,
  CustomerController,
  ProfileController,
  RoomController,
  StaffController,
  UserController,
} from './http';
import {
  BookingService,
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
    BookingController,
  ],
  providers: [
    UserService,
    CustomerService,
    ProfileService,
    StaffService,
    RoomService,
    BookingService,
  ],
  exports: [UserService],
})
export class IdentityModule {}
