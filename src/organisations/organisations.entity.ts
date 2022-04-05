import { Exclude } from 'class-transformer';
import { User } from 'src/auth/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany((_type) => User, (user) => user.organisation, { eager: true })
  @Exclude({ toPlainOnly: true })
  users: User[];
}
