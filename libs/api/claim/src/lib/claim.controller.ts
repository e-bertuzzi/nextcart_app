import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ClaimService } from './claim.service';
import { Claim } from '@nextcart/models';

@ApiTags('product-claims')
@Controller('product-claims')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Get()
  @ApiOperation({ summary: 'Get all product claims' })
  @ApiResponse({ status: 200, description: 'List of claims', type: [Claim] })
  async getAll(): Promise<Claim[]> {
    return this.claimService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single claim by id' })
  @ApiParam({ name: 'id', description: 'Claim id' })
  @ApiResponse({ status: 200, description: 'The claim', type: Claim })
  @ApiResponse({ status: 404, description: 'Claim not found' })
  async getOne(@Param('id') id: string): Promise<Claim> {
    const claim = await this.claimService.findOne(id);
    if (!claim) {
      throw new NotFoundException(`Claim with id ${id} not found`);
    }
    return claim;
  }
}
