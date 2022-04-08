import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Room } from '../rooms/rooms.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingStatus } from './enum/booking-status.enum';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  notes: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  status: BookingStatus;

  @Column()
  duration: number;

  @ManyToOne((_type) => User, (user) => user.booking, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToOne(() => Room, (room) => room.bookings)
  @JoinColumn()
  room: Room;

  @Column()
  organisation: string;
}
