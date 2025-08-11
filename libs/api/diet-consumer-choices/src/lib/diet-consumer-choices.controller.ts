import { Body, Controller, Delete, Get, HttpCode, Param, Patch } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { DietConsumerChoiceService } from './diet-consumer-choices.service';

@ApiTags('diet-consumer-choices')
@Controller('diet-consumer-choices')
export class DietConsumerChoiceController {
  constructor(private dietConsumerChoicesService: DietConsumerChoiceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all diet consumer choices' })
  @ApiResponse({ status: 200, description: 'List of all diet consumer choices' })
  getAllChoices() {
    return this.dietConsumerChoicesService.findAll();
  }

  @Get('users/:userId')
  @ApiOperation({ summary: "Get all diet choices for a user" })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'List of diet choices for the user' })
  getUserChoices(@Param('userId') userId: number) {
    return this.dietConsumerChoicesService.findByUser(userId);
  }

  @Patch('users/:userId')
  @HttpCode(200)
  @ApiOperation({ summary: "Update user's diet choices" })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        dietIds: {
          type: 'array',
          items: { type: 'string' },
          example: ['diet1', 'diet2', 'diet3'],
        },
      },
      required: ['dietIds'],
    },
  })
  @ApiResponse({ status: 200, description: "User's diet choices updated" })
  updateUserChoices(
    @Param('userId') userId: number,
    @Body() body: { dietIds: string[] }
  ) {
    return this.dietConsumerChoicesService.updateUserDiets(userId, body.dietIds);
  }

  @Delete('users/:userId/diets/:dietId')
  @ApiOperation({ summary: "Remove a diet choice for a user" })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'dietId', type: String, description: 'Diet ID to remove' })
  @ApiResponse({ status: 200, description: "User's diet choice removed" })
  removeChoice(
    @Param('userId') userId: number,
    @Param('dietId') dietId: string
  ) {
    return this.dietConsumerChoicesService.removeUserDiet(userId, dietId);
  }
}
