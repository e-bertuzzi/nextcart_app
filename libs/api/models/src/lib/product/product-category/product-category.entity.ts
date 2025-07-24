// product-category.entity.ts
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from '../product.entity';
import { Allergen } from '../../allergen';

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

  @ManyToMany(() => Allergen, allergen => allergen.productCategories)
  @JoinTable({
    joinColumn: {
      name: 'ProductCategory', referencedColumnName: 'productCategoryId',
    },
    inverseJoinColumn: {
      name: 'Allergens', referencedColumnName: 'allergenId',
    },
  })
  allergensList?: Allergen[]; //attenzione: si chiama allergensList perché abbiamo già un attributo allergenes. probabilmente è presente anche questo campo testuale per motivi legacy
}
