import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthConditionsService } from './health-conditions.service';
import { FilterHealthConditionsDto } from '@nextcart/dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('health-conditions')
export class HealthConditionsController {
  constructor(private readonly healthConditionService: HealthConditionsService) {}

  @Get('categories')
  @ApiOperation({ summary: 'Get all health condition categories' })
  @ApiResponse({ status: 200, description: 'List of categories returned' })
  async getCategories() {
    return this.healthConditionService.getAllCategories();
  }

 /* @Get()
  @ApiOperation({ summary: 'Get all health conditions' })
  @ApiResponse({ status: 200, description: 'List of health conditions returned' })
  async getAllHealthConditions() {
    return this.healthConditionService.getHealthConditions();
  }*/

  @Get('incompatibilities')
  @ApiOperation({ summary: 'Get health condition incompatibilities' })
  @ApiResponse({ status: 200, description: 'List of incompatibilities returned' })
  async getIncompatibilities() {
    return this.healthConditionService.getIncompatibilities();
  }

  @Post('filter')
  @ApiOperation({ summary: 'Filter health conditions by criteria' })
  @ApiBody({ type: FilterHealthConditionsDto })
  @ApiResponse({ status: 200, description: 'Filtered health conditions returned' })
  async filterHealthConditions(@Body() filterDto: FilterHealthConditionsDto) {
    return this.healthConditionService.filterHealthConditions(filterDto);
  }

  /*@Patch('users/:id/health-conditions')
  @ApiOperation({ summary: 'Update health conditions for a user' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiBody({
    schema: {
      example: {
        healthConditionIds: [1, 2, 3],
      },
    },
    description: 'List of health condition IDs to assign to user',
  })
  @ApiResponse({ status: 200, description: 'User health conditions updated successfully' })
  async updateHealthConditions(
    @Param('id') userId: number,
    @Body() body: { healthConditionIds: number[] }
  ) {
    return this.healthConditionService.updateUserHealthConditions(userId, body.healthConditionIds);
  } */

  /*@Get('users/:id/health-conditions')
  @ApiOperation({ summary: 'Get health conditions of a user' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User health conditions retrieved' })
  async getUserHealthConditions(@Param('id') userId: number) {
    return this.healthConditionService.getUserHealthConditions(userId);
  }*/

  @Get('categories/pathologies')
  @ApiOperation({ summary: 'Get all pathologies under health condition categories' })
  @ApiResponse({ status: 200, description: 'Pathologies list returned' })
  async getPathologies() {
    return this.healthConditionService.getPathologies;
  }

  // GET singola health condition di un utente (opzionale)
  /*@Get('users/:userId/health-conditions/:conditionId')
  @ApiOperation({ summary: 'Get a specific health condition of a user' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'conditionId', type: Number, description: 'Health Condition ID' })
  @ApiResponse({ status: 200, description: 'User health condition returned' })
  async getUserHealthCondition(
    @Param('userId') userId: number,
    @Param('conditionId') conditionId: number,
  ) {
    return this.healthConditionService.getUserHealthCondition(userId, conditionId);
  }*/

  /*@Delete('users/:userId/health-conditions/:conditionId')
  @ApiOperation({ summary: 'Remove a health condition from a user' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'conditionId', type: Number, description: 'Health Condition ID' })
  @ApiResponse({ status: 200, description: 'Health condition removed successfully' })
  async removeUserHealthCondition(
    @Param('userId') userId: number,
    @Param('conditionId') conditionId: number,
  ) {
    return this.healthConditionService.removeUserHealthCondition(userId, conditionId);
  }*/


}
