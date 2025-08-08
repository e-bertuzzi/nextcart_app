import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ProductCategory } from './product-category/product-category.entity';
import { ProductClaim } from './product-claim/product-claim.entity';
import { ProductAllergen } from './product-allergen/product-allergen.entity';
import { ProductNutritionalInfo } from './product-nutrition/product-nutritional-info.entity';
import { ProductDiet } from './product-diet/product-diet.entity';

@Entity()
export class Product {
  @PrimaryColumn({ type: 'varchar', length: 100, name: 'product_id' })
  productId!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true, name: 'it_name' })
  itName?: string;

  @ManyToOne(() => ProductCategory, (category) => category.products, {
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'product_category' })
  productCategory?: ProductCategory;

  @OneToMany(() => ProductClaim, (pc) => pc.product, { cascade: true })
  productClaims?: ProductClaim[];

  @OneToMany(() => ProductAllergen, (pa) => pa.product, { cascade: true })
  productAllergens?: ProductAllergen[];

  @OneToMany(() => ProductNutritionalInfo, (pni) => pni.product, {
    cascade: true,
  })
  nutritionalInformationValues?: ProductNutritionalInfo[];

  @OneToMany(() => ProductDiet, (pd) => pd.product, { cascade: true })
  productDiets?: ProductDiet[];
}
