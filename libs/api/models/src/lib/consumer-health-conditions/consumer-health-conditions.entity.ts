// models/consumer-health-condition.entity.ts

import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Consumer } from '../consumer';
import { HealthCondition } from '../health-condition';

@Entity()
export class ConsumerHealthCondition {
  @PrimaryColumn()
  Consumer!: number;

  @PrimaryColumn()
  HealthConditions!: string;

  @ManyToOne(() => Consumer, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'Consumer' })
  consumer!: Consumer;

  @ManyToOne(() => HealthCondition, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'HealthConditions' })
  healthCondition!: HealthCondition;
}
