import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';
import { PaymentEntity } from './payment.entity';
import { CustomerEntity } from './customer.entity';
import { StatusBooking } from 'src/common/constants/enum';

@Entity('tbl_booking')
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  booking_id: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.bookings)
  customer: CustomerEntity;

  @ManyToMany(() => RoomEntity, (room) => room.bookings)
  rooms: RoomEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.booking)
  payments: PaymentEntity[];

  @Column()
  check_in: Date;

  @Column()
  check_out: Date;

  @Column({ type: 'enum', enum: StatusBooking, default: StatusBooking.pending })
  status: StatusBooking;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
