import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { DietConsumerChoiceService } from './diet-consumer-choices.service';

@Controller('diet-consumer-choices')
export class DietConsumerChoiceController {
  constructor(private dietConsumerChoicesService: DietConsumerChoiceService) {}

  @Get()
  getAllChoices() {
    return this.dietConsumerChoicesService.findAll();
  }

  @Get('users/:userId')
  getUserChoices(@Param('userId') userId: number) {
    return this.dietConsumerChoicesService.findByUser(userId);
  }

  @Patch('users/:userId')
  @HttpCode(200)
  updateUserChoices(
    @Param('userId') userId: number,
    @Body() body: { dietIds: string[] }
  ) {
    return this.dietConsumerChoicesService.updateUserDiets(
      userId,
      body.dietIds
    );
  }

  @Delete('users/:userId/diets/:dietId')
  removeChoice(
    @Param('userId') userId: number,
    @Param('dietId') dietId: string
  ) {
    return this.dietConsumerChoicesService.removeUserDiet(userId, dietId);
  }
}
