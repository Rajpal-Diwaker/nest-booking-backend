import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Room } from 'src/rooms/rooms.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingStatus } from './enum/booking-status.enum';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  notes: string;

  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column({ type: 'timestamptz' })
  endTime: Date;

  @Column()
  status: BookingStatus;

  @Column()
  duration: number;

  @ManyToOne((_type) => User, (user) => user.booking, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToMany(() => Room, {
    eager: true,
  })
  @JoinColumn()
  room: Room;
}
