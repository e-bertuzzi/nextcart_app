// models/product-category-allergen.entity.ts
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductCategory } from '../product-category.entity';
import { Allergen } from '../../../allergen';

@Entity()
export class ProductCategoryAllergen {
  @PrimaryColumn({ name: 'product_category', type: 'varchar', length: 100 })
  productCategoryId!: string;

  @PrimaryColumn({ name: 'allergen', type: 'varchar', length: 25 })
  allergenId!: string;

  @ManyToOne(() => ProductCategory, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'product_category', referencedColumnName: 'productCategoryId' })
  productCategory!: ProductCategory;

  @ManyToOne(() => Allergen, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'allergen', referencedColumnName: 'allergenId' })
  allergen!: Allergen;
}
