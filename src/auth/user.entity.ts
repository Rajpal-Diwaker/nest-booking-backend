import { Task } from '../tasks/task.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organisation } from 'src/organisations/organisations.entity';
import { Exclude } from 'class-transformer';
import { Booking } from 'src/bookings/bookings.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column('varchar', { default: 'user' })
  role: string;

  @OneToMany((_type) => Booking, (booking) => booking.user, { eager: true })
  booking: Booking[];

  @ManyToOne((_type) => Organisation, (organisation) => organisation.users, {
    eager: true,
  })
  //   @Exclude({ toPlainOnly: true })
  organisation: Organisation;
}
