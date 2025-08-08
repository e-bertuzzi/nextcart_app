import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../product.entity';
import { Allergen } from '../../allergen';
import { Exclude } from 'class-transformer';

@Entity()
export class ProductAllergen {
  @PrimaryColumn({ name: 'product' })
  productId!: string;

  @PrimaryColumn({ name: 'allergen' })
  allergenId!: string;

  @ManyToOne(() => Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'product' })
  @Exclude()
  product!: Product;

  @ManyToOne(() => Allergen)
  @JoinColumn({ name: 'allergen' })
  allergen!: Allergen;
}
