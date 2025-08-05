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
  @PrimaryColumn({ type: 'varchar', length: 100 })
  productId!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  itName?: string;

  @ManyToOne(() => ProductCategory, (category) => category.products, {
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'productCategory' })
  productCategory?: ProductCategory;

  @OneToMany(() => ProductClaim, (pc) => pc.product)
  productClaims?: ProductClaim[];

  @OneToMany(() => ProductAllergen, (pa) => pa.product)
  productAllergens?: ProductAllergen[];

  @OneToMany(() => ProductNutritionalInfo, (pni) => pni.product)
  nutritionalInformationValues?: ProductNutritionalInfo[];

  @OneToMany(() => ProductDiet, (pd) => pd.product)
  productDiets?: ProductDiet[];
}
