import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { User } from '../../schemas';
import { Type } from 'class-transformer';

export class CreateRentalSlipDto {
  @ValidateNested()
  @Type(() => User)
  customer: User;

  @IsNotEmpty()
  @Type(() => String)
  rooms: string[];

  @IsDate()
  rentalDate: Date;

  @IsNumber()
  daysOfStay: number;

  @IsDate()
  expectedDate: Date;

  @IsDate()
  returnDate: Date;

  @IsNumber()
  totalAmount: number;

  @IsBoolean()
  payment: boolean;
}
