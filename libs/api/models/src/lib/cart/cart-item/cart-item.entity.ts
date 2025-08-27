import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "../cart.entity";
import { Product } from "../../product";

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn({ name: 'cart_item_id' })
  cartItemId!: number;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart!: Cart;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column({ type: 'int', default: 1 })
  quantity!: number;
}
