import { BusinessType } from 'src/business-types/entities/business-type.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('businesses')
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 75,
  })
  name: string;

  @Column('varchar', {
    length: 75,
    unique: true,
  })
  email: string;

  @Column('varchar', {
    length: 100,
  })
  password: string;

  @Column('decimal', {
    name: 'delivery_cost',
    precision: 10,
    scale: 2,
    default: 0,
  })
  deliveryCost: number;

  @Column('text', {
    nullable: true,
  })
  image: string;

  @Column('boolean', {
    default: false,
    name: 'is_enabled',
  })
  isEnabled: boolean;

  @Column('varchar', {
    nullable: true,
    length: 8,
    name: 'opening_time',
  })
  openingTime: string;

  @Column('varchar', {
    nullable: true,
    length: 8,
    name: 'closing_time',
  })
  closingTime: string;

  @Column('boolean', {
    default: false,
    name: 'is_open',
  })
  isOpen: boolean;

  @Column('varchar', {
    length: 10,
    name: 'phone_number',
  })
  phoneNumber: string;

  @Column('varchar', {
    nullable: false,
    default: '+52',
    length: 4,
    name: 'country_phone_code',
  })
  countryPhoneCode: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @ManyToOne(() => BusinessType, (businessType) => businessType.id, {
    nullable: false,
  })
  @JoinColumn({
    name: 'business_type_id',
  })
  businessType: BusinessType;
}
