import { Entity, PrimaryColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { ProductAllergen } from '../product';
import { ProductCategoryAllergen } from '../product';

@Entity()
export class Allergen {
  @PrimaryColumn()
  allergenId!: string;

  @Column({ length: 45, nullable: true })
  allergenName?: string;

  @OneToMany(() => ProductCategoryAllergen, pca => pca.allergen)
  categoryLinks?: ProductCategoryAllergen[];

  @OneToMany(() => ProductAllergen, pa => pa.allergen)
  productAllergens?: ProductAllergen[];
}
