import { Booking } from 'src/bookings/bookings.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoomStatus } from './enum/room-status.enum';
import { RoomType } from './enum/room-type.enum';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  minCapacity: number;

  @Column()
  maxCapacity: number;

  @Column()
  status: RoomStatus;

  @Column()
  type: RoomType;

  @Column()
  image: string;

  //   @OneToOne(() => Booking, (booking: Booking) => booking.room)
  //   booking: ;
}
