import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookingEntity } from './booking.entity';
import { StatusPayment } from 'src/common/constants/enum';

@Entity('tbl_payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  payment_id: string;

  @ManyToOne(() => BookingEntity, (booking) => booking.payments)
  booking: BookingEntity;

  @Column()
  method: string;

  @Column('decimal')
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  payment_date: Date;

  @Column({ type: 'enum', enum: StatusPayment })
  status: StatusPayment;
}
