import { Controller, Get, Patch, Param, Delete, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ConsumerHealthConditionService } from './consumer-health-condition.service';

@ApiTags('consumer-health-conditions')
@Controller('consumer-health-conditions')
export class ConsumerHealthConditionController {
  constructor(private readonly service: ConsumerHealthConditionService) {}

  @Get('users/:userId')
  @ApiOperation({ summary: 'Get all health conditions for a user' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' })
  @ApiResponse({ status: 200, description: 'List of user health conditions' })
  async getUserHealthConditions(@Param('userId') userId: number) {
    return this.service.getUserHealthConditions(userId);
  }

  /*@Get('users/:userId/:conditionId')
  @ApiOperation({ summary: 'Get a specific health condition for a user' })
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' })
  @ApiParam({ name: 'conditionId', type: Number, description: 'ID of the health condition' })
  @ApiResponse({ status: 200, description: 'The user health condition' })
  async getUserHealthCondition(
    @Param('userId') userId: number,
    @Param('conditionId') conditionId: number,
  ) {
    return this.service.getUserHealthCondition(userId, conditionId);
  }*/

  @Patch('users/:userId')
  @ApiOperation({ summary: "Update user's health conditions" })
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        healthConditionIds: {
          type: 'array',
          items: { type: 'number' },
          example: [1, 2, 3],
        },
      },
      required: ['healthConditionIds'],
    },
  })
  @ApiResponse({ status: 200, description: "User's health conditions updated" })
  async updateUserHealthConditions(
    @Param('userId') userId: number,
    @Body() body: { healthConditionIds: number[] }
  ) {
    return this.service.updateUserHealthConditions(
      userId,
      body.healthConditionIds
    );
  }

  @Delete('users/:userId/health-conditions/:conditionId')
  @ApiOperation({ summary: "Remove a user's health condition" })
  @ApiParam({ name: 'userId', type: Number, description: 'ID of the user' })
  @ApiParam({
    name: 'conditionId',
    type: String,
    description: 'ID of the health condition to remove',
  })
  @ApiResponse({ status: 200, description: "User's health condition removed" })
  async removeUserHealthCondition(
    @Param('userId') userId: number,
    @Param('conditionId') conditionId: string
  ) {
    return this.service.removeUserHealthCondition(userId, conditionId);
  }

  @Get(':conditionId/nutrient-constraints')
  @ApiOperation({
    summary: 'Get nutrient constraints for a specific health condition',
  })
  @ApiParam({
    name: 'conditionId',
    type: String,
    description: 'ID of the health condition',
  })
  @ApiResponse({
    status: 200,
    description: 'List of nutrient constraints for the given health condition',
  })
  @ApiResponse({
    status: 404,
    description: 'No nutrient constraints found for this health condition',
  })
  async getNutrientConstraints(@Param('conditionId') conditionId: string) {
    return this.service.getNutrientConstraints(conditionId);
  }

  @Get('user/:userId/nutrient-constraints')
  async getUserNutrientConstraints(@Param('userId') userId: number) {
    return this.service.getUserNutrientConstraints(userId);
  }
}
