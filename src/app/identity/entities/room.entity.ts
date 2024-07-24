import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookingEntity } from './booking.entity';
import { StatusRoom } from 'src/common/constants/enum';

@Entity('tbl_room')
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  room_id: string;

  @Column()
  room_number: string;

  @Column()
  type: string;

  @Column('decimal')
  price: number;

  @Column({ type: 'enum', enum: StatusRoom, default: StatusRoom.available })
  status: StatusRoom;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: Date;

  @ManyToMany(() => BookingEntity, (booking) => booking.rooms)
  bookings: BookingEntity[];
}
