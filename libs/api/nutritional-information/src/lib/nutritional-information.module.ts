import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NutritionalInformation } from '@nextcart/models';
import { NutritionalInformationService } from './nutritional-information.service';
import { NutritionalInformationController } from './nutritional-information.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NutritionalInformation])],
  providers: [NutritionalInformationService],
  controllers: [NutritionalInformationController],
  exports: [NutritionalInformationService],
})
export class NutritionalInformationModule {}
