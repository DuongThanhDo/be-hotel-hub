import { User } from '../../schemas';

export class CreateRentalSlipDto {
  customer: User;

  rooms: string[];

  rentalDate: Date;

  daysOfStay: number;

  expectedDate: Date;

  returnDate: Date;

  totalAmount: number;

  payment: boolean;
}
