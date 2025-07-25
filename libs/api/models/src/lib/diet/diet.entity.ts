import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Consumer } from "../consumer/consumer.entity";
import { DietIncompatibility } from "./incompatibility/diet-incompatibility.entity";
import { Product } from "../product";

@Entity()
export class Diet {
    @PrimaryColumn()
    dietId!: string;

    @Column({ unique: true })
    description!: string;

    @Column()
    restrictionLevel?: number;

    @ManyToMany(() => Consumer, (consumer) => consumer.diets)
    consumers?: Consumer[];

    @OneToMany(() => DietIncompatibility, (inc) => inc.diet)
    incompatibilities?: DietIncompatibility[];

    @ManyToMany(() => Product, product => product.diets)
    products?: Product[];

}