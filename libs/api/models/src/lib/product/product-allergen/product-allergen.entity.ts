import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../product.entity';
import { Allergen } from '../../allergen';

@Entity()
export class ProductAllergen {
  @PrimaryColumn()
  Product!: string;

  @PrimaryColumn()
  Allergens!: string;

  @ManyToOne(() => Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'Product' })
  product!: Product;

  @ManyToOne(() => Allergen)
  @JoinColumn({ name: 'Allergens' })
  allergen!: Allergen;
}
