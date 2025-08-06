import { Entity, PrimaryColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { ProductAllergen } from '../product';
import { ProductCategoryAllergen } from '../product';

@Entity()
export class Allergen {
  @PrimaryColumn({ name: 'allergen_id' })
  allergenId!: string;

  @Column({ length: 45, nullable: true, name: 'allergen_name' })
  allergenName?: string;

  @OneToMany(() => ProductCategoryAllergen, pca => pca.allergen)
  categoryLinks?: ProductCategoryAllergen[];

  @OneToMany(() => ProductAllergen, pa => pa.allergen)
  productAllergens?: ProductAllergen[];
}
