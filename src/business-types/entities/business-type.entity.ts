import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('business_types')
export class BusinessType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 75,
    name: 'singular_name',
  })
  singularName: string;

  @Column('varchar', {
    length: 75,
    name: 'plural_name',
  })
  pluralName: string;

  @Column('varchar', {
    length: 150,
    nullable: true,
  })
  img: string;
}
