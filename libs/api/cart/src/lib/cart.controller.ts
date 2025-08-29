import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CreateCartDto } from '@nextcart/dto';
import { AddCartItemDto, UpdateCartItemDto } from '@nextcart/dto';
import { Cart } from '@nextcart/models';
import { CartItem } from '@nextcart/models';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cart/shopping list' })
  @ApiResponse({
    status: 201,
    description: 'Cart successfully created',
    type: Cart,
  })
  async createCart(@Body() dto: CreateCartDto): Promise<Cart> {
    return this.cartService.createCart(dto);
  }

  @Get(':cartId')
  @ApiOperation({ summary: 'Get a cart with its products' })
  @ApiResponse({ status: 200, description: 'Cart details', type: Cart })
  async getCart(@Param('cartId') cartId: number): Promise<Cart> {
    return this.cartService.getCart(cartId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all carts for a user' })
  @ApiResponse({ status: 200, description: 'User carts', type: [Cart] })
  async getUserCarts(@Param('userId') userId: number): Promise<Cart[]> {
    return this.cartService.getCartsByUser(userId);
  }

  @Post(':cartId/items')
  @ApiOperation({ summary: 'Add a product to the cart' })
  @ApiResponse({
    status: 201,
    description: 'Product successfully added to cart',
    type: CartItem,
  })
  async addItem(
    @Param('cartId') cartId: number,
    @Body() dto: AddCartItemDto
  ): Promise<CartItem> {
    return this.cartService.addItem(cartId, dto);
  }

  @Delete('items/:cartItemId')
  @ApiOperation({ summary: 'Remove a cart item by its ID' })
  @ApiResponse({ status: 200, description: 'Cart item successfully removed' })
  async removeItemByCartItemId(
    @Param('cartItemId') cartItemId: string
  ): Promise<void> {
    return this.cartService.removeItemByCartItemId(cartItemId);
  }

  @Delete(':cartId')
  @ApiOperation({ summary: 'Delete a cart' })
  @ApiResponse({ status: 200, description: 'Cart successfully deleted' })
  async deleteCart(@Param('cartId') cartId: number): Promise<void> {
    return this.cartService.deleteCart(cartId);
  }

  @Patch('items/:cartItemId')
  async updateCartItem(
    @Param('cartItemId') cartItemId: string,
    @Body() dto: { delta: number }
  ): Promise<CartItem> {
    return this.cartService.updateItemQuantityByCartItemId(
      cartItemId,
      dto.delta
    );
  }
}
