import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Product } from '../product.entity';
import { ProductCategoryAllergen } from './product-category-allergens/product-category-allergen.entity';

@Entity()
export class ProductCategory {
  @PrimaryColumn({ type: 'varchar', length: 100, name: 'product_category_id' })
  productCategoryId!: string;

  @Column({ name: 'group', type: 'varchar', length: 255, nullable: true })
  group?: string;

  @Column({ name: 'category', type: 'varchar', length: 100, nullable: true })
  category?: string;

  @Column({ name: 'standard_portion', type: 'varchar', length: 100, nullable: true })
  standardPortion?: string;

  // Relazione gerarchica (parent/children)
  //@ManyToOne(() => ProductCategory, (category) => category.children, {
  //  nullable: true,
  //  onDelete: 'SET NULL',
  //})
  //@JoinColumn({ name: 'parentId' }) // NB: colonna non presente nello schema, rimuovi se non usata nel DB
  //parent?: ProductCategory;

  //@OneToMany(() => ProductCategory, (category) => category.parent)
  //children?: ProductCategory[];

  @OneToMany(() => Product, (product) => product.productCategory)
  products?: Product[];

  @OneToMany(() => ProductCategoryAllergen, (pca) => pca.productCategory)
  allergenLinks?: ProductCategoryAllergen[];
}
