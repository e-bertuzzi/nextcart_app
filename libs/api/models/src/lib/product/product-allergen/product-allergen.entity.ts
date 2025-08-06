import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../product.entity';
import { Allergen } from '../../allergen';

@Entity()
export class ProductAllergen {
  @PrimaryColumn({ name: 'product' })
  Product!: string;

  @PrimaryColumn({ name: 'allergen' })
  Allergens!: string;

  @ManyToOne(() => Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'product' })
  product!: Product;

  @ManyToOne(() => Allergen)
  @JoinColumn({ name: 'allergen' })
  allergen!: Allergen;
}
