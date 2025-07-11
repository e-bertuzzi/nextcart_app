import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { Consumer } from '@nextcart/models';
import { ConsumerService } from '@nextcart/consumer';  // importa il service

@Module({
  imports: [TypeOrmModule.forFeature([Consumer])],
  providers: [ProfileService, ConsumerService],  // registra entrambi
  controllers: [ProfileController],
})
export class ProfileModule {}
