import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthConditionsService } from './health-conditions.service';
import { FilterHealthConditionsDto } from '@nextcart/dto';

@Controller('health-conditions')
export class HealthConditionsController {
  constructor(private readonly healthConditionService: HealthConditionsService) {}

  @Get('categories')
  async getCategories() {
    return this.healthConditionService.getAllCategories();
  }

  @Get()
  async getAllHealthConditions() {
    return this.healthConditionService.getHealthConditions();
  }

  @Get('incompatibilities')
  async getIncompatibilities() {
    return this.healthConditionService.getIncompatibilities();
  }

  @Post('filter')
  async filterHealthConditions(@Body() filterDto: FilterHealthConditionsDto) {
    return this.healthConditionService.filterHealthConditions(filterDto);
  }

  @Patch('users/:id/health-conditions')
  async updateHealthConditions(
    @Param('id') userId: number,
    @Body() body: { healthConditionIds: number[] }
  ) {
    return this.healthConditionService.updateUserHealthConditions(userId, body.healthConditionIds);
  } 

  @Get('users/:id/health-conditions')
  async getUserHealthConditions(@Param('id') userId: number) {
    return this.healthConditionService.getUserHealthConditions(userId);
  }

  @Get('categories/pathologies')
  async getPathologies() {
    return this.healthConditionService.getPathologies;
  }

  // GET singola health condition di un utente (opzionale)
  @Get('users/:userId/health-conditions/:conditionId')
  async getUserHealthCondition(
    @Param('userId') userId: number,
    @Param('conditionId') conditionId: number,
  ) {
    return this.healthConditionService.getUserHealthCondition(userId, conditionId);
  }

  @Delete('users/:userId/health-conditions/:conditionId')
  async removeUserHealthCondition(
    @Param('userId') userId: number,
    @Param('conditionId') conditionId: number,
  ) {
    return this.healthConditionService.removeUserHealthCondition(userId, conditionId);
  }


}
