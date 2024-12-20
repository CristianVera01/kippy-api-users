import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 75,
    name: 'first_name',
  })
  firstName: string;

  @Column('varchar', {
    length: 75,
    name: 'last_name',
  })
  lastName: string;

  @Column('varchar', {
    length: 75,
    unique: true,
  })
  email: string;

  @Column('varchar', {
    length: 4,
    default: '+52',
    name: 'country_code',
  })
  countryCode: string;

  @Column('varchar', {
    length: 10,
    name: 'phone_number',
    unique: true,
  })
  phoneNumber: string;

  @Column('varchar', {
    length: 255,
  })
  password: string;

  @Column('bool', {
    default: true,
    name: 'is_active',
  })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
