import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { DietService } from './diet.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('diet')
export class DietController {
  constructor(private dietService: DietService) {}

  @Get()
  @ApiOperation({ summary: 'Get all available diets' })
  @ApiResponse({ status: 200, description: 'List of diets returned successfully' })
  async getAllDiets() {
    return this.dietService.getAllDiets();
  }

  @Get('incompatibilities')
  @ApiOperation({ summary: 'Get dietary incompatibilities' })
  @ApiResponse({ status: 200, description: 'List of dietary incompatibilities returned successfully' })
  async getIncompatibilities() {
    return this.dietService.getIncompatibilities();
  }

  @Patch('users/:id/diets')
  @ApiOperation({ summary: 'Update a user\'s selected diets' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiBody({
    schema: {
      example: {
        dietIds: [1, 2, 3],
      },
    },
    description: 'Array of diet IDs to assign to the user',
  })
  @ApiResponse({ status: 200, description: 'User diets updated successfully' })
  async updateHealthConditions(
    @Param('id') userId: number,
    @Body() body: { dietIds: number[] }
  ) {
    return this.dietService.updateUserDiets(userId, body.dietIds);
  } 

  @Get('users/:id/diets')
  @ApiOperation({ summary: 'Get all diets assigned to a user' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User diets retrieved successfully' })
  async getUserDiets(@Param('id') userId: number) {
    return this.dietService.getUserDiets(userId);
  }

  @Delete('users/:userId/diets/:dietId')
  @ApiOperation({ summary: 'Remove a specific diet from a user' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'dietId', type: Number, description: 'Diet ID to remove' })
  @ApiResponse({ status: 200, description: 'Diet removed from user successfully' })
  async removeUserDiet(
    @Param('userId') userId: number,
    @Param('dietId') dietId: number,
  ) {
    return this.dietService.removeUserDiet(userId, dietId);
  }

}
