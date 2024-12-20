import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('delivery_addresses')
export class DeliveryAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 50,
  })
  name: string;

  @Column('varchar', {
    length: 100,
  })
  references: string;

  @Column('varchar')
  latitude: string;

  @Column('varchar')
  longitude: string;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
