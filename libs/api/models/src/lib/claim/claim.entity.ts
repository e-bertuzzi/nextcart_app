import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ProductClaim } from '../product/product-claim/product-claim.entity';

@Entity()
export class Claim {
  @PrimaryColumn({ name: 'claim_id' })
  claimId!: string;

  @Column('text')
  description!: string;

  @OneToMany(() => ProductClaim, pc => pc.claim, { cascade: true })
  productClaims?: ProductClaim[];
}
