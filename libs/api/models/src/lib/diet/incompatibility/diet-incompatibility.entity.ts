import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Diet } from "../diet.entity";

@Entity()
export class DietIncompatibility {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Diet, (diet) => diet.incompatibilities)
  @JoinColumn({ name: 'dietId' })
  diet!: Diet;

  @ManyToOne(() => Diet)
  @JoinColumn({ name: 'incompatibleWithId' })
  incompatibleWith!: Diet;
}
