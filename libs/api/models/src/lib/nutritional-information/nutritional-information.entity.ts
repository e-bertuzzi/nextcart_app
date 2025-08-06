import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ProductNutritionalInfo } from '../product/product-nutrition';
import { NutrientHealthCondition } from './nutrient-health';

@Entity()
export class NutritionalInformation {
  @PrimaryColumn({ name: 'nutrient_id' })
  nutrientId!: string;

  @Column({ length: 100, name: 'nutrient_it' })
  nutrientIT!: string;

  @Column({ length: 255, nullable: true })
  unitOfMeasure?: string;

  @OneToMany(() => ProductNutritionalInfo, pni => pni.nutrient)
  products?: ProductNutritionalInfo[];

  @OneToMany(() => NutrientHealthCondition, nhc => nhc.nutrient)
  healthConditionRelations?: NutrientHealthCondition[];
}
