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

  @ManyToMany(() => Claim, (claim) => claim.products)
  @JoinTable({
    //name: 'ProductClaims',
    joinColumn: { name: 'Product', referencedColumnName: 'productId' },
    inverseJoinColumn: { name: 'Claims', referencedColumnName: 'claimsId' },
  })
  claims!: Claim[];

  @OneToMany(() => ProductAllergen, pa => pa.product)
  productAllergens?: ProductAllergen[];

  @OneToMany(() => ProductNutritionalInfo, (pni) => pni.product)
  nutritionalInformationValues?: ProductNutritionalInfo[];

  @ManyToMany(() => Diet, (diet) => diet.products)
  @JoinTable({
    //name: 'ProductDiet', // nome della tabella intermedia
    joinColumn: {
      name: 'Product', // nome della colonna in ProductDiet che fa riferimento a Product
      referencedColumnName: 'productId',
    },
    inverseJoinColumn: {
      name: 'Diet', // nome della colonna in ProductDiet che fa riferimento a Diet
      referencedColumnName: 'dietId', // assicurati che sia il nome giusto nella tua entità Diet
    },
  })
  diets?: Diet[];
}
