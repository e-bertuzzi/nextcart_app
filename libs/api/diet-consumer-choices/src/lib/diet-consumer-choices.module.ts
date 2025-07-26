import { Module } from '@nestjs/common';
import { DietConsumerChoiceController } from './diet-consumer-choices.controller';
import { DietConsumerChoiceService } from './diet-consumer-choices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer, Diet, DietConsumerChoice } from '@nextcart/models';

@Module({
  imports: [
    TypeOrmModule.forFeature([DietConsumerChoice, Consumer, Diet]),
  ],
  controllers: [DietConsumerChoiceController],
  providers: [DietConsumerChoiceService],
  exports: [DietConsumerChoiceService],
})
export class DietConsumerChoiceModule {}
