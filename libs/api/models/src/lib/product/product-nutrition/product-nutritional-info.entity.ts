import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '..';
import { NutritionalInformation } from '../../nutritional-information';

@Entity()
export class ProductNutritionalInfo {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, product => product.nutritionalInformationValues, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @ManyToOne(() => NutritionalInformation, nutrient => nutrient.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nutrient_id' })
  nutrient!: NutritionalInformation;

  @Column('float', { nullable: true })
  value?: number;

}
