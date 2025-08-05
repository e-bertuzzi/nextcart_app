import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../product.entity';
import { Diet } from '../../diet'; // aggiorna il path secondo la struttura

@Entity()
export class ProductDiet {
  @PrimaryColumn()
  productId!: string;

  @PrimaryColumn()
  dietId!: string;

  @ManyToOne(() => Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @ManyToOne(() => Diet, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'dietId' })
  diet!: Diet;
}