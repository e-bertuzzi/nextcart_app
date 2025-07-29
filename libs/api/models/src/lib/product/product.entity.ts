// product.entity.ts
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ProductCategory } from './product-category/product-category.entity';
import { Claim } from '../claim';
import { Allergen } from '../allergen';
import { ProductNutritionalInfo } from './product-nutrition/product-nutritional-info.entity';
import { Diet } from '../diet';
import { ProductAllergen } from './product-allergen/product-allergen.entity';
import { ProductClaim } from './product-claim/product-claim.entity';
import { ProductDiet } from './product-diet/product-diet.entity';

@Entity()
export class Product {
  @PrimaryColumn()
  productId!: string;

  @Column({ length: 200, nullable: true })
  description?: string;

  @ManyToOne(() => ProductCategory, (category) => category.products, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'productCategory' }) // maps to the column in SQL
  productCategory?: ProductCategory;

  @OneToMany(() => ProductClaim, pc => pc.product)
  productClaims?: ProductClaim[];

  @OneToMany(() => ProductAllergen, pa => pa.product)
  productAllergens?: ProductAllergen[];

  @OneToMany(() => ProductNutritionalInfo, (pni) => pni.product)
  nutritionalInformationValues?: ProductNutritionalInfo[];

  @OneToMany(() => ProductDiet, pd => pd.product)
  productDiets?: ProductDiet[]; 
}
