import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, CartItem, Product } from '@nextcart/models';
import { CreateCartDto } from '@nextcart/dto';
import { AddCartItemDto } from '@nextcart/dto';

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
    } else {
      item = this.cartItemRepo.create({
        cart,
        product,
        quantity: dto.quantity,
      });
    }

    return this.cartItemRepo.save(item);
  }

  async removeItem(cartId: number, productId: string): Promise<void> {
    await this.cartItemRepo.delete({
      cart: { cartId },
      product: { productId },
    });
  }

  async deleteCart(cartId: number): Promise<void> {
    const result = await this.cartRepo.delete({ cartId });
    if (result.affected === 0) {
      throw new NotFoundException(`Cart ${cartId} not found`);
    }
  }
}
