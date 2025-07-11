import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  //ManyToOne,
} from 'typeorm';
import { Gender, Role } from '@nextcart/enum';

@Entity()
export class Consumer {
  @PrimaryGeneratedColumn()
  consumerId!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  surname?: string;

  @Column()
  dateOfBirth!: Date;

  @Column({ nullable: true })
  placeOfBirth?: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.isMale,
  })
  gender!: Gender;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.isUser,
  })
  role!: Role;

  @Column({ nullable: true })
  address?: string;

  //@ManyToOne(() => Family, (family) => family.members, { nullable: true })
  //family?: Family;
}
