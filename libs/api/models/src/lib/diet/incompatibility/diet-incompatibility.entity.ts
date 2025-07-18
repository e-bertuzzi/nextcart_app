import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Diet } from "../diet.entity";

@Entity()
export class DietIncompatibility {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Diet, (diet) => diet.incompatibilities)
  @JoinColumn({ name: 'diet_id' })
  diet!: Diet;

  @ManyToOne(() => Diet)
  @JoinColumn({ name: 'incompatible_with_id' })
  incompatibleWith!: Diet;
}
