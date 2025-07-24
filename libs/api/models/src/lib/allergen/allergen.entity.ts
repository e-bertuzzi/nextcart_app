import { Entity, PrimaryColumn, Column, ManyToMany } from 'typeorm';
import { Product, ProductCategory } from '../product';

@Entity()
export class Allergen {
  @PrimaryColumn()
  allergenId!: string;

  @Column({ length: 45, nullable: true })
  allergenName?: string;

  @ManyToMany(() => ProductCategory, category => category.allergens)
  productCategories?: ProductCategory[];

  @ManyToMany(() => Product, product => product.allergens)
  products?: Product[];
}
