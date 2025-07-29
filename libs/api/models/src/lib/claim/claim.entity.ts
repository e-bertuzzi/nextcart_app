import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ProductClaim } from '../product/product-claim/product-claim.entity';

@Entity()
export class Claim {
  @PrimaryColumn()
  claimsId!: string;

  @Column('text')
  description!: string;

  @OneToMany(() => ProductClaim, pc => pc.claim)
  productClaims?: ProductClaim[];
}
