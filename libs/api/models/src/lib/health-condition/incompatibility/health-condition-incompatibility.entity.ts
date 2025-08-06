import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { HealthCondition } from '../health-condition.entity';

@Entity()
export class HealthConditionIncompatibility {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => HealthCondition, (condition) => condition.incompatibilities)
  @JoinColumn({ name: 'condition_id' })
  condition!: HealthCondition;

  @ManyToOne(() => HealthCondition)
  @JoinColumn({ name: 'incompatible_with_id' })
  incompatibleWith!: HealthCondition;
}
