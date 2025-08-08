import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, Claim, Allergen, Diet, ProductCategory } from '@nextcart/models';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Claim,
      Allergen,
      Diet,
      ProductCategory,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
