// models/consumer-health-condition.entity.ts

import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Consumer } from '../consumer.entity';
import { HealthCondition } from '../../health-condition';

@Entity()
export class ConsumerHealthCondition {
  @PrimaryColumn({ name: 'consumer' })
  Consumer!: number;

  @PrimaryColumn({ name: 'health_condition' })
  HealthConditions!: string;

  @ManyToOne(() => Consumer, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'consumer' })
  consumer!: Consumer;

  @ManyToOne(() => HealthCondition, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'health_condition' })
  healthCondition!: HealthCondition;
}
