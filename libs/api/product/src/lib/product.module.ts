import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product, Claim, Allergen, Diet, ProductCategory, NutritionalInformation, ProductClaim, ProductAllergen, ProductDiet, ProductNutritionalInfo } from '@nextcart/models';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Claim,
      Allergen,
      Diet,
      ProductCategory,
      NutritionalInformation,
      ProductClaim,          // << Aggiungi qui
      ProductAllergen,       // << Aggiungi qui
      ProductDiet,           // << Aggiungi qui
      ProductNutritionalInfo // << Aggiungi qui
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
