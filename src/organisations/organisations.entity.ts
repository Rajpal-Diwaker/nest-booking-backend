import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Room } from '../rooms/rooms.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Organisation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column('numeric', { default: 0 })
  roomsBooked: number;

  @OneToMany((_type) => User, (user) => user.organisation, { eager: false })
  @Exclude({ toPlainOnly: true })
  users: User[];

  @OneToMany((_type) => Room, (room) => room.organisation, {
    eager: true,
    cascade: true,
  })
  rooms: Room[];
}
