import { Module } from '@nestjs/common';
import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consumer } from '@nextcart/models';

@Module({
  controllers: [ConsumerController],
  providers: [ConsumerService],
  exports: [ConsumerService],
  imports: [TypeOrmModule.forFeature([Consumer])],
})
export class ConsumerModule {}
