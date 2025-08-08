import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../product.entity';
import { Diet } from '../../diet'; // aggiorna il path secondo la struttura
import { Exclude } from 'class-transformer';

@Entity()
export class ProductDiet {
  @PrimaryColumn({ name: 'product_id' })
  productId!: string;

  @PrimaryColumn({ name: 'diet_id' })
  dietId!: string;

  @ManyToOne(() => Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  @Exclude()
  product!: Product;

  @ManyToOne(() => Diet, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'diet_id' })
  diet!: Diet;
}