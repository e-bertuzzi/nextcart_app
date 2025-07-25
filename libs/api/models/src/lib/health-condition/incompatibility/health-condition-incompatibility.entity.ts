import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { HealthCondition } from '../health-condition.entity';

@Entity()
export class HealthConditionIncompatibility {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => HealthCondition, (condition) => condition.incompatibilities)
  @JoinColumn({ name: 'conditionId' })
  condition!: HealthCondition;

  @ManyToOne(() => HealthCondition)
  @JoinColumn({ name: 'incompatibleWithId' })
  incompatibleWith!: HealthCondition;
}
