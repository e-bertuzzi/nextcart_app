import { Module } from '@nestjs/common';
import { HealthConditionsController } from './health-conditions.controller';
import { HealthConditionsService } from './health-conditions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer, HealthCondition, HealthConditionCategory, HealthConditionIncompatibility } from '@nextcart/models';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HealthCondition,
      HealthConditionCategory,
      HealthConditionIncompatibility,
      Consumer
    ]),
  ],
  controllers: [HealthConditionsController],
  providers: [HealthConditionsService],
  exports: [HealthConditionsService],
})
export class HealthConditionModule {}
