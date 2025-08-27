import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consumer } from "../consumer";
import { CartItem } from "./cart-item/cart-item.entity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn({ name: 'cart_id' })
  cartId!: number;

  @ManyToOne(() => Consumer, consumer => consumer.carts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'consumer_id' })
  consumer!: Consumer;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true })
  items!: CartItem[];
}
