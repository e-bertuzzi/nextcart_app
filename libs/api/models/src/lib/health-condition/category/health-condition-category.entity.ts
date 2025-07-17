import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { HealthCondition } from '../health-condition.entity';

@Entity()
export class HealthConditionCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  code!: string; // es: 'age', 'pathology', 'physiological_state'

  @Column()
  label!: string; // es: 'Fascia di età', 'Condizione patologica'

  @OneToMany(() => HealthCondition, (hc) => hc.category)
  healthConditions!: HealthCondition[];
}
