import { Module } from '@nestjs/common';
import { DietController } from './diet.controller';
import { DietService } from './diet.service';
import { Consumer, Diet, DietIncompatibility } from '@nextcart/models';
import { TypeOrmModule } from '@nestjs/typeorm';

// diet.module.ts
@Module({
  imports: [
    TypeOrmModule.forFeature([Diet, DietIncompatibility, Consumer]),
    //ConsumerModule, // 👈 importa qui
  ],
  providers: [DietService],
  controllers: [DietController],
})
export class DietModule {}

