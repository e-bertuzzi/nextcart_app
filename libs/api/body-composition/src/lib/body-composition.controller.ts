import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BodyCompositionService } from './body-composition.service';
import { CreateBodyCompositionDto } from '@nextcart/dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Body Composition')
@Controller('body-composition')
export class BodyCompositionController {
  constructor(private readonly bodyCompositionService: BodyCompositionService) {}

  // 🔹 GET tutte le body composition di un utente
  @Get('users/:id')
  @ApiOperation({ summary: 'Get all body compositions for a user' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'List of body compositions returned successfully' })
  async getAllByUser(@Param('id') userId: number) {
    return this.bodyCompositionService.getAllByConsumer(userId);
  }

  // 🔹 GET una body composition specifica (utente + data)
  @Get('users/:userId/:date')
  @ApiOperation({ summary: 'Get body composition by user and date' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'date', type: String, description: 'Date in YYYY-MM-DD format' })
  @ApiResponse({ status: 200, description: 'Body composition data returned' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async getOneByUserAndDate(
    @Param('userId') userId: number,
    @Param('date') date: string,
  ) {
    return this.bodyCompositionService.getOne(userId, date);
  }

  // 🔹 POST crea o aggiorna una body composition
  @Post('users/:id')
  @ApiOperation({ summary: 'Create or update body composition for a user' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiBody({ type: CreateBodyCompositionDto })
  @ApiResponse({ status: 201, description: 'Body composition saved successfully' })
  async createOrUpdate(
    @Param('id') userId: number,
    @Body() dto: CreateBodyCompositionDto,
  ) {
    return this.bodyCompositionService.createOrUpdate(userId, dto);
  }

  // 🔹 DELETE rimuove una body composition
  @Delete('users/:userId/:date')
  @ApiOperation({ summary: 'Delete body composition by user and date' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiParam({ name: 'date', type: String, description: 'Date in YYYY-MM-DD format' })
  @ApiResponse({ status: 200, description: 'Body composition deleted successfully' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async deleteByUserAndDate(
    @Param('userId') userId: number,
    @Param('date') date: string,
  ) {
    return this.bodyCompositionService.remove(userId, date);
  }
}
