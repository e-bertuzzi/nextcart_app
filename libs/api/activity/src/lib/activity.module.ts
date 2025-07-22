import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity, Consumer, PhysicalActivity } from '@nextcart/models';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, PhysicalActivity, Consumer])],
  controllers: [ActivityController],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {}
