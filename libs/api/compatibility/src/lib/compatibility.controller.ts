import { Controller, Get, Param } from '@nestjs/common';
import { CompatibilityService } from './compatibility.service';

@Controller('compatibility')
export class CompatibilityController {
  constructor(private readonly compatibilityService: CompatibilityService) {}

  // GET /compatibility/:consumerId/:productId
  @Get(':consumerId/:productId')
  async check(
    @Param('consumerId') consumerId: number,
    @Param('productId') productId: string,
  ): Promise<{ compatible: boolean }> {
    const compatible = await this.compatibilityService.checkProductCompatibility(
      consumerId,
      productId,
    );
    return { compatible };
  }
}
