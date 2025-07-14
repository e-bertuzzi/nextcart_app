import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  //ManyToOne,
} from 'typeorm';
import { Gender, Role } from '@nextcart/enum';
import { HealthCondition } from '../health-condition/health-condition.entity';

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

  @ManyToMany(() => HealthCondition, (condition) => condition.consumers, {
    cascade: true, // opzionale: salva automaticamente relazioni nuove
  })
  @JoinTable() // Necessario solo su un lato per indicare la tabella pivot
    healthConditions: HealthCondition[] | undefined;
  }

  //@ManyToOne(() => Family, (family) => family.members, { nullable: true })
  //family?: Family;

