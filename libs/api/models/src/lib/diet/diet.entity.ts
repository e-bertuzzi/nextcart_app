import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { DietIncompatibility } from './incompatibility/diet-incompatibility.entity';
import { DietConsumerChoice } from './diet-consumer-choices';
import { ProductDiet } from '../product/product-diet/product-diet.entity';

@Entity()
export class Diet {
  @PrimaryColumn({ name: 'diet_id' })
  dietId!: string;

  @Column({ unique: true })
  description!: string;

  @Column({ name: 'restriction_level' })
  restrictionLevel?: number;

  @OneToMany(() => DietConsumerChoice, (dcc) => dcc.diet)
  dietConsumerChoices?: DietConsumerChoice[];

  @OneToMany(() => DietIncompatibility, (inc) => inc.diet)
  incompatibilities?: DietIncompatibility[];

  @OneToMany(() => ProductDiet, (pd) => pd.diet)
  productDiets?: ProductDiet[];
}
