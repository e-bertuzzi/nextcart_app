import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartItem, Product } from '@nextcart/models';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem, Product]), // <- importante
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
