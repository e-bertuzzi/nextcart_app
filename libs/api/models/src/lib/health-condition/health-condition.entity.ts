import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  //ManyToOne,
} from 'typeorm';
import { Consumer } from '../consumer/consumer.entity';
import { HealthConditionCategory } from './category/health-condition-category.entity';
import { HealthConditionIncompatibility } from './incompatibility/health-condition-incompatibility.entity';

@Entity()
export class HealthCondition {
  @PrimaryGeneratedColumn()
  healthConditionId!: number;

  @Column({ unique: true })
  description?: string;

  @ManyToOne(() => HealthConditionCategory, (category) => category.healthConditions)
  category!: HealthConditionCategory;

  @ManyToMany(() => Consumer, (consumer) => consumer.healthConditions)
  consumers?: Consumer[];

  @OneToMany(() => HealthConditionIncompatibility, (inc) => inc.condition)
  incompatibilities?: HealthConditionIncompatibility[];
}
