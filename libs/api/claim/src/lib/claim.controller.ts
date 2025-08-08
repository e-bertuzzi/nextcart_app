import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { Claim } from '@nextcart/models';

@Controller('product-claims')  // endpoint che vuoi esporre
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Get()
  async getAll(): Promise<Claim[]> {
    return this.claimService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Claim> {
    const claim = await this.claimService.findOne(id);
    if (!claim) {
      throw new NotFoundException(`Claim with id ${id} not found`);
    }
    return claim;
  }
}
