import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  //ManyToOne,
} from 'typeorm';
import { Consumer } from '../consumer/consumer.entity';
import { HealthConditionCategory } from './category/health-condition-category.entity';
import { HealthConditionIncompatibility } from './incompatibility/health-condition-incompatibility.entity';
import { NutrientHealthCondition } from '../nutritional-information';

@Entity()
export class HealthCondition {
  @PrimaryColumn()
  healthConditionId!: string;

  @Column({ unique: true })
  description?: string;

  @ManyToOne(() => HealthConditionCategory, (category) => category.healthConditions)
  category!: HealthConditionCategory;

  @ManyToMany(() => Consumer, (consumer) => consumer.healthConditions)
  consumers?: Consumer[];

  @OneToMany(() => HealthConditionIncompatibility, (inc) => inc.condition)
  incompatibilities?: HealthConditionIncompatibility[];

  @OneToMany(() => NutrientHealthCondition, nhc => nhc.healthCondition)
  nutrientRelations?: NutrientHealthCondition[];

}
