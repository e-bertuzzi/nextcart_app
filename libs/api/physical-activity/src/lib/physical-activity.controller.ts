import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PhysicalActivityService } from './physical-activity.service';
import { PhysicalActivity } from '@nextcart/models';
import { CreatePhysicalActivityDto } from '@nextcart/dto';

@Controller('physical-activities')
export class PhysicalActivityController {
  constructor(private readonly service: PhysicalActivityService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Get('consumer/:consumerId')
  findByConsumer(@Param('consumerId') consumerId: number) {
    return this.service.findByConsumer(consumerId);
  }


  @Post()
  async create(@Body() dto: CreatePhysicalActivityDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<PhysicalActivity>) {
    return this.service.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
