import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Claim } from '@nextcart/models';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Claim])],
  providers: [ClaimService],
  controllers: [ClaimController],
  exports: [ClaimService],  // se serve esportarlo
})
export class ClaimModule {}
