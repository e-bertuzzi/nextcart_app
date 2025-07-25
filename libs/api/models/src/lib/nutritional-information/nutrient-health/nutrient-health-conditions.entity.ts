// nutrient-health-condition.entity.ts
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { HealthCondition } from '../../health-condition';
import { NutritionalInformation } from '../nutritional-information.entity';

@Entity()
export class NutrientHealthCondition {
  @PrimaryColumn()
  healthConditionId!: string;

  @PrimaryColumn()
  nutrientId!: string;

  @Column({ type: 'int', nullable: true })
  minQuantity?: number;

  @Column({ type: 'int', nullable: true })
  maxQuantity?: number;

  @Column({ type: 'boolean', nullable: true })
  percentKCal?: boolean;

  @Column({ type: 'boolean', nullable: true })
  uoMperKg?: boolean;

  @ManyToOne(() => HealthCondition, hc => hc.nutrientRelations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'healthConditionId' })
  healthCondition!: HealthCondition;

  @ManyToOne(() => NutritionalInformation, ni => ni.healthConditionRelations, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'nutrientId' })
  nutrient!: NutritionalInformation;
}
