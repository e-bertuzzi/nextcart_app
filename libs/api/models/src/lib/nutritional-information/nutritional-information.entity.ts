import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ProductNutritionalInfo } from '../product/product-nutrition';
import { NutrientHealthCondition } from './nutrient-health';

@Entity()
export class NutritionalInformation {
  @PrimaryColumn()
  nutrientId!: string;

  @Column({ length: 100 })
  nutrientIT!: string;

  @Column({ length: 255, nullable: true })
  unitOfMeasure?: string;

  @OneToMany(() => ProductNutritionalInfo, pni => pni.nutrient)
  products?: ProductNutritionalInfo[];

  @OneToMany(() => NutrientHealthCondition, nhc => nhc.nutrient)
  healthConditionRelations?: NutrientHealthCondition[];


}
