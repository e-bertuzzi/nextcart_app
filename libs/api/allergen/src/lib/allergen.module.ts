import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allergen } from '@nextcart/models';
import { AllergenService } from './allergen.service';
import { AllergenController } from './allergen.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Allergen])],
  providers: [AllergenService],
  controllers: [AllergenController],
  exports: [AllergenService],
})
export class AllergenModule {}
