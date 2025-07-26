import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  Body,
} from '@nestjs/common';
import { ConsumerHealthConditionService } from './consumer-health-condition.service';

@Controller('consumer-health-conditions')
export class ConsumerHealthConditionController {
  constructor(private readonly service: ConsumerHealthConditionService) {}

  @Get('users/:userId')
  async getUserHealthConditions(@Param('userId') userId: number) {
    return this.service.getUserHealthConditions(userId);
  }

  /*@Get('users/:userId/:conditionId')
  async getUserHealthCondition(
    @Param('userId') userId: number,
    @Param('conditionId') conditionId: number,
  ) {
    return this.service.getUserHealthCondition(userId, conditionId);
  }*/

  @Patch('users/:userId')
  async updateUserHealthConditions(
    @Param('userId') userId: number,
    @Body() body: { healthConditionIds: number[] },
  ) {
    return this.service.updateUserHealthConditions(userId, body.healthConditionIds);
  }

  @Delete('users/:userId/health-conditions/:conditionId')
  async removeUserHealthCondition(
    @Param('userId') userId: number,
    @Param('conditionId') conditionId: string
  ) {
    return this.service.removeUserHealthCondition(userId, conditionId);
  }
}
