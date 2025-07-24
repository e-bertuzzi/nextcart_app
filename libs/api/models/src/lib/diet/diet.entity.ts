import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consumer } from "../consumer/consumer.entity";
import { DietIncompatibility } from "./incompatibility/diet-incompatibility.entity";
import { Product } from "../product";

@Entity()
export class Diet {
    @PrimaryGeneratedColumn()
    dietId!: number;

    @Column({ unique: true })
    description!: string;

    @Column({ unique: true })
    details!: string;

    @Column()
    restrictionLevel?: number;

    @ManyToMany(() => Consumer, (consumer) => consumer.diets)
    consumers?: Consumer[];

    @OneToMany(() => DietIncompatibility, (inc) => inc.diet)
    incompatibilities?: DietIncompatibility[];

    @ManyToMany(() => Product, product => product.diets)
    products?: Product[];

}