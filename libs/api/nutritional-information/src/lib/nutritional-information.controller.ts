import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NutritionalInformationService } from './nutritional-information.service';
import { NutritionalInformation } from '@nextcart/models';

@Controller('nutritional-information')
export class NutritionalInformationController {
  constructor(private readonly service: NutritionalInformationService) {}

  @Get()
  async getAll(): Promise<NutritionalInformation[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<NutritionalInformation> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<NutritionalInformation>): Promise<NutritionalInformation> {
    return this.service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<NutritionalInformation>): Promise<NutritionalInformation> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
