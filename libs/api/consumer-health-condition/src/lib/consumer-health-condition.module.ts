import { Module } from '@nestjs/common';
import { ConsumerHealthConditionController } from './consumer-health-condition.controller';
import { ConsumerHealthConditionService } from './consumer-health-condition.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer, ConsumerHealthCondition, HealthCondition, HealthConditionCategory, HealthConditionIncompatibility } from '@nextcart/models';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConsumerHealthCondition, // ⬅ DEVE essere presente
      HealthCondition,
      Consumer,
      HealthConditionIncompatibility,
      HealthConditionCategory,
    ]),
  ],
  controllers: [ConsumerHealthConditionController],
  providers: [ConsumerHealthConditionService],
  exports: [ConsumerHealthConditionService],
})
export class ConsumerHealthConditionModule {}
