// product-category.entity.ts
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { Product } from '../product.entity';
import { ProductCategoryAllergen } from './product-category-allergens/product-category-allergen.entity';

@Entity()
export class ProductCategory {
  @PrimaryColumn()
  productCategoryId!: string;

  @Column({ length: 255, nullable: true })
  description?: string;

  @Column({ length: 100, nullable: true })
  typology?: string;

  @Column({ length: 255, nullable: true })
  allergens?: string;

  // Relazione padre
  @ManyToOne(() => ProductCategory, category => category.children, {
    nullable: true,
    onDelete: 'SET NULL', // o CASCADE se preferisci
  })
  @JoinColumn({ name: 'parentId' })
  parent?: ProductCategory;

  // Relazione figli
  @OneToMany(() => ProductCategory, category => category.parent)
  children?: ProductCategory[];

  @OneToMany(() => Product, product => product.productCategory)
  products?: Product[];

  @OneToMany(() => ProductCategoryAllergen, pca => pca.productCategory)
  allergenLinks?: ProductCategoryAllergen[];
}
