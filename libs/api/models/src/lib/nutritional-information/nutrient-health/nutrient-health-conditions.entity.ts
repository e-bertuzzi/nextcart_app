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
  @PrimaryColumn({ name: 'health_condition_id' })
  healthConditionId!: string;

  @PrimaryColumn({ name: 'nutrient_id' })
  nutrientId!: string;

  @Column({ type: 'int', nullable: true, name: 'min_quantity' })
  minQuantity?: number;

  @Column({ type: 'int', nullable: true, name: 'max_quantity' })
  maxQuantity?: number;

  @Column({ type: 'boolean', nullable: true, name: 'percent_kcal' })
  percentKCal?: boolean;

  @Column({ type: 'boolean', nullable: true, name: 'uom_per_kcal' })
  uoMperKg?: boolean;

  @ManyToOne(() => HealthCondition, hc => hc.nutrientRelations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'health_condition_id' })
  healthCondition!: HealthCondition;

  @ManyToOne(() => NutritionalInformation, ni => ni.healthConditionRelations, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'nutrient_id' })
  nutrient!: NutritionalInformation;
}
