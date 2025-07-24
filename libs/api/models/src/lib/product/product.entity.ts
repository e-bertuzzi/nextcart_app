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
import { ProductNutritionalInfo } from '../nutrional-information';
import { Diet } from '../diet';

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

  @ManyToMany(() => Allergen, (allergen) => allergen.products, {
    cascade: true,
  })
  @JoinTable({
    //name: 'ProductAllergens', // nome della tabella pivot
    joinColumn: {
      name: 'Product',
      referencedColumnName: 'productId',
    },
    inverseJoinColumn: {
      name: 'Allergens',
      referencedColumnName: 'allergenId',
    },
  })
  allergens?: Allergen[];

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
