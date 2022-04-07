import { Booking } from 'src/bookings/bookings.entity';
import { Organisation } from 'src/organisations/organisations.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @ManyToOne(() => Organisation, (organisation) => organisation.rooms)
  @JoinColumn({ name: 'organisation', referencedColumnName: 'id' })
  organisation: Organisation;

  @OneToMany(() => Booking, (booking: Booking) => booking.room)
  @JoinColumn()
  bookings: Booking[];
}
