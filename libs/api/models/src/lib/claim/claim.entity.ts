import { Entity, Column, PrimaryColumn, ManyToMany } from 'typeorm';
import { Product } from '../product';

@Entity()
export class Claim {
  @PrimaryColumn()
  claimsId!: string;

  @Column('text')
  description!: string;

  @ManyToMany(() => Product, product => product.claims)
  products!: Product[];
}
