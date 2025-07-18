import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { DietService } from './diet.service';

@Controller('diet')
export class DietController {
  constructor(private dietService: DietService) {}

  @Get()
  async getAllDiets() {
    return this.dietService.getAllDiets();
  }

  @Get('incompatibilities')
  async getIncompatibilities() {
    return this.dietService.getIncompatibilities();
  }

  @Patch('users/:id/diets')
  async updateHealthConditions(
    @Param('id') userId: number,
    @Body() body: { dietIds: number[] }
  ) {
    return this.dietService.updateUserDiets(userId, body.dietIds);
  } 

  @Get('users/:id/diets')
  async getUserDiets(@Param('id') userId: number) {
    return this.dietService.getUserDiets(userId);
  }

  @Delete('users/:userId/diets/:dietId')
  async removeUserDiet(
    @Param('userId') userId: number,
    @Param('dietId') dietId: number,
  ) {
    return this.dietService.removeUserDiet(userId, dietId);
  }

}
