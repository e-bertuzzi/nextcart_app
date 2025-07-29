import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../product.entity';
import { Diet } from '../../diet'; // aggiorna il path secondo la struttura

@Entity({ name: 'ProductDiet' })
export class ProductDiet {
  @PrimaryColumn()
  Product!: string;

  @PrimaryColumn()
  Diet!: string;

  @ManyToOne(() => Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'Product' })
  product!: Product;

  @ManyToOne(() => Diet)
  @JoinColumn({ name: 'Diet' })
  diet!: Diet;
}
