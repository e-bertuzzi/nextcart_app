import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  //ManyToOne,
} from 'typeorm';
import { Consumer } from '../consumer/consumer.entity';

@Entity()
export class HealthCondition {
  @PrimaryGeneratedColumn()
  healthConditionId!: number;

  @Column({ unique: true })
  description?: string;

  @ManyToMany(() => Consumer, (consumer) => consumer.healthConditions)
  consumers: Consumer[] | undefined;
}
