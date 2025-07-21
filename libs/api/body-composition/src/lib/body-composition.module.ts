import { Module } from '@nestjs/common';
import { BodyCompositionController } from './body-composition.controller';
import { BodyCompositionService } from './body-composition.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BodyComposition, Consumer } from '@nextcart/models';

@Module({
  imports: [TypeOrmModule.forFeature([BodyComposition, Consumer])],
  controllers: [BodyCompositionController],
  providers: [BodyCompositionService],
  exports: [BodyCompositionService],
})
export class BodyCompositionModule {}
