// models/product-category-allergen.entity.ts
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductCategory } from '../product-category.entity';
import { Allergen } from '../../../allergen';

@Entity()
export class ProductCategoryAllergen {
  @PrimaryColumn({ name: 'ProductCategory', type: 'varchar', length: 100 })
  productCategoryId!: string;

  @PrimaryColumn({ name: 'Allergens', type: 'varchar', length: 25 })
  allergenId!: string;

  @ManyToOne(() => ProductCategory, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'ProductCategory', referencedColumnName: 'productCategoryId' })
  productCategory!: ProductCategory;

  @ManyToOne(() => Allergen, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'Allergens', referencedColumnName: 'allergenId' })
  allergen!: Allergen;
}
