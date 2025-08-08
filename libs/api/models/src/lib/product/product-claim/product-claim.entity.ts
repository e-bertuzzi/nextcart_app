import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../product.entity';
import { Claim } from '../../claim'; // Adatta il path
import { Exclude } from 'class-transformer';

@Entity()
export class ProductClaim {
  @PrimaryColumn({ name: 'product' })
  productId!: string;

  @PrimaryColumn({ name: 'claim' })
  claimId!: string;

  @ManyToOne(() => Product, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'product' })
  @Exclude()  // <-- Escludi questa proprietà dalla serializzazione per evitare il ciclo
  product!: Product;

  @ManyToOne(() => Claim)
  @JoinColumn({ name: 'claim' })
  claim!: Claim;
}
