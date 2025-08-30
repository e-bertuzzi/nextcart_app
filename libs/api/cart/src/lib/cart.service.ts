import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, CartItem, Product } from '@nextcart/models';
import { CreateCartDto } from '@nextcart/dto';
import { AddCartItemDto } from '@nextcart/dto';
import { CartItemWarning } from '@nextcart/enum';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>
  ) {}

  async createCart(dto: CreateCartDto): Promise<Cart> {
    const cart = this.cartRepo.create({
      name: dto.name,
      consumer: { consumerId: dto.consumerId } as any,
    });
    return this.cartRepo.save(cart);
  }

  async getCart(cartId: number): Promise<Cart> {
    const cart = await this.cartRepo.findOne({
      where: { cartId },
      relations: ['items', 'items.product'],
    });
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async getCartsByUser(userId: number): Promise<Cart[]> {
    return this.cartRepo.find({
      where: { consumer: { consumerId: userId } },
      relations: ['items', 'items.product'], // se vuoi includere i prodotti
    });
  }

  async addItem(cartId: number, dto: AddCartItemDto): Promise<CartItem> {
    const cart = await this.cartRepo.findOne({ where: { cartId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const product = await this.productRepo.findOne({
      where: { productId: dto.productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    let item = await this.cartItemRepo.findOne({
      where: { cart: { cartId }, product: { productId: dto.productId } },
    });

    if (item) {
      item.quantity += dto.quantity;

      // 🔹 Aggiorna/aggiungi warning se ne vengono passati
      if (dto.warnings?.length) {
        // combina eventuali warning esistenti con quelli nuovi, evitando duplicati
        const existingWarnings = item.warnings || [CartItemWarning.NONE];
        const newWarnings = dto.warnings.filter(
          (w) => !existingWarnings.includes(w)
        );
        item.warnings = [...existingWarnings, ...newWarnings];
      }
    } else {
      item = this.cartItemRepo.create({
        cart,
        product,
        quantity: dto.quantity,
        warnings: dto.warnings?.length ? dto.warnings : [CartItemWarning.NONE], // default NONE
      });
    }

    return this.cartItemRepo.save(item);
  }

  async removeItemByCartItemId(cartItemId: string): Promise<void> {
    await this.cartItemRepo
      .createQueryBuilder()
      .delete()
      .from(CartItem)
      .where('cart_item.cart_item_id = :cartItemId', { cartItemId })
      .execute();
  }

  async deleteCart(cartId: number): Promise<void> {
    const result = await this.cartRepo.delete({ cartId });
    if (result.affected === 0) {
      throw new NotFoundException(`Cart ${cartId} not found`);
    }
  }

  async updateItemQuantityByCartItemId(
    cartItemId: string,
    delta: number
  ): Promise<CartItem> {
    const item = await this.cartItemRepo.findOne({
      where: { cartItemId: Number(cartItemId) },
      relations: ['product', 'cart'],
    });
    if (!item) throw new NotFoundException('Cart item not found');

    item.quantity += delta;
    if (item.quantity <= 0) {
      await this.cartItemRepo.delete({ cartItemId: Number(cartItemId) });
      throw new NotFoundException(
        'Cart item removed because quantity reached zero'
      );
    }

    return this.cartItemRepo.save(item);
  }
}
