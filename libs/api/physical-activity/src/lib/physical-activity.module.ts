import { Module } from '@nestjs/common';
import { PhysicalActivityController } from './physical-activity.controller';
import { PhysicalActivityService } from './physical-activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity, Consumer, PhysicalActivity } from '@nextcart/models';

@Module({
  imports: [TypeOrmModule.forFeature([
    PhysicalActivity,
    Activity,
    Consumer,
  ])],
  controllers: [PhysicalActivityController],
  providers: [PhysicalActivityService],
  exports: [PhysicalActivityService],
})
export class PhysicalActivityModule {}
