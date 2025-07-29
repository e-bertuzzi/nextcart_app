import { Entity, PrimaryColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Product } from '../product';
import { ProductCategoryAllergen } from '../product';

@Entity()
export class Allergen {
  @PrimaryColumn()
  allergenId!: string;

  @Column({ length: 45, nullable: true })
  allergenName?: string;

  @OneToMany(() => ProductCategoryAllergen, pca => pca.allergen)
  categoryLinks?: ProductCategoryAllergen[];

  @ManyToMany(() => Product, product => product.allergens)
  products?: Product[];
}
