import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Consumer,
  Diet,
  HealthCondition,
  HealthConditionCategory,
  HealthConditionIncompatibility,
  DietIncompatibility,
  BodyComposition,
  Activity,
  PhysicalActivity,
  Product,
  ProductCategory,
  Claim,
  Allergen,
  NutritionalInformation,
  ProductNutritionalInfo,
  NutrientHealthCondition,
  DietConsumerChoice,
  ConsumerHealthCondition,
  ProductCategoryAllergen,
  ProductAllergen,
  ProductClaim,
  ProductDiet,
  Cart,
  CartItem
} from '@nextcart/models';
import { AuthModule } from '@nextcart/api-auth';
import { ProfileModule } from '@nextcart/profile';
import { HealthConditionModule } from '@nextcart/health-conditions';
import { ConfigModule } from '@nestjs/config';
import { DietModule } from '@nextcart/diet';
import { BodyCompositionModule } from '@nextcart/body-composition';
import { ActivityModule } from '@nextcart/activity';
import { PhysicalActivityModule } from '@nextcart/physical-activity';
import { DietConsumerChoiceModule } from '@nextcart/diet-consumer-choices';
import { ConsumerHealthConditionModule } from '@nextcart/consumer-health-condition';
import { ProductModule } from '@nextcart/product'
import { ProductCategoryModule } from '@nextcart/product-category';
import { ClaimModule } from '@nextcart/claim';
import { AllergenModule } from '@nextcart/allergen';
import { NutritionalInformationModule } from '@nextcart/nutritional-information';
 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // o IP del DB
      port: 5432,
      username: 'utente',
      password: 'utente123',
      database: 'nextcart',
      entities: [
        Consumer,
        HealthCondition,
        HealthConditionCategory,
        HealthConditionIncompatibility,
        Diet,
        NutrientHealthCondition,
        DietConsumerChoice,
        ConsumerHealthCondition,
        DietIncompatibility,
        BodyComposition,
        Activity,
        PhysicalActivity,
        Product,
        ProductCategory,
        Claim,
        Allergen,
        NutritionalInformation,
        ProductNutritionalInfo,
        ProductCategoryAllergen,
        ProductAllergen,
        ProductClaim,
        ProductDiet,
        DietConsumerChoice,
        Cart,
        CartItem,
      ],
      synchronize: true,
      logging: true,
      logger: 'advanced-console',
    }),
    AuthModule,
    ProfileModule,
    HealthConditionModule,
    DietModule,
    BodyCompositionModule,
    ActivityModule,
    PhysicalActivityModule,
    DietConsumerChoiceModule,
    ConsumerHealthConditionModule,
    ProductModule,
    ProductCategoryModule,
    ClaimModule,
    AllergenModule,
    NutritionalInformationModule,
    ConfigModule.forRoot({
      isGlobal: true, // disponibile ovunque
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
