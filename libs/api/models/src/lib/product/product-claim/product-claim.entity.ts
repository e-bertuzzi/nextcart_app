import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../product.entity';
import { Claim } from '../../claim'; // Adatta il path in base alla tua struttura

@Entity()
export class ProductClaim {
  @PrimaryColumn()
  Product!: string;

  @PrimaryColumn()
  Claims!: string;

  @ManyToOne(() => Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'Product' })
  product!: Product;

  @ManyToOne(() => Claim)
  @JoinColumn({ name: 'Claims' })
  claim!: Claim;
}
