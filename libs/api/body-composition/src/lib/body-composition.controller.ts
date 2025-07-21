import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BodyCompositionService } from './body-composition.service';
import { CreateBodyCompositionDto } from '@nextcart/dto';

@Controller('body-composition')
export class BodyCompositionController {
  constructor(private readonly bodyCompositionService: BodyCompositionService) {}

  // 🔹 GET tutte le body composition di un utente
  @Get('users/:id')
  async getAllByUser(@Param('id') userId: number) {
    return this.bodyCompositionService.getAllByConsumer(userId);
  }

  // 🔹 GET una body composition specifica (utente + data)
  @Get('users/:userId/:date')
  async getOneByUserAndDate(
    @Param('userId') userId: number,
    @Param('date') date: string,
  ) {
    return this.bodyCompositionService.getOne(userId, date);
  }

  // 🔹 POST crea o aggiorna una body composition
  @Post('users/:id')
  async createOrUpdate(
    @Param('id') userId: number,
    @Body() dto: CreateBodyCompositionDto,
  ) {
    return this.bodyCompositionService.createOrUpdate(userId, dto);
  }

  // 🔹 DELETE rimuove una body composition
  @Delete('users/:userId/:date')
  async deleteByUserAndDate(
    @Param('userId') userId: number,
    @Param('date') date: string,
  ) {
    return this.bodyCompositionService.remove(userId, date);
  }
}
