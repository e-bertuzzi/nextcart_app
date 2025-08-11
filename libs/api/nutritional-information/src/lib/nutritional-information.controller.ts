import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { NutritionalInformationService } from './nutritional-information.service';
import { NutritionalInformation } from '@nextcart/models';

@ApiTags('nutritional-information')
@Controller('nutritional-information')
export class NutritionalInformationController {
  constructor(private readonly service: NutritionalInformationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all nutritional information entries' })
  @ApiResponse({ status: 200, description: 'List of nutritional information', type: [NutritionalInformation] })
  async getAll(): Promise<NutritionalInformation[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a nutritional information entry by id' })
  @ApiParam({ name: 'id', type: String, description: 'Nutritional Information ID' })
  @ApiResponse({ status: 200, description: 'Nutritional information found', type: NutritionalInformation })
  @ApiResponse({ status: 404, description: 'Nutritional information not found' })
  async getOne(@Param('id') id: string): Promise<NutritionalInformation> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new nutritional information entry' })
  @ApiBody({ type: NutritionalInformation })
  @ApiResponse({ status: 201, description: 'Nutritional information created', type: NutritionalInformation })
  async create(@Body() data: Partial<NutritionalInformation>): Promise<NutritionalInformation> {
    return this.service.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing nutritional information entry' })
  @ApiParam({ name: 'id', type: String, description: 'Nutritional Information ID' })
  @ApiBody({ type: NutritionalInformation })
  @ApiResponse({ status: 200, description: 'Nutritional information updated', type: NutritionalInformation })
  @ApiResponse({ status: 404, description: 'Nutritional information not found' })
  async update(
    @Param('id') id: string,
    @Body() data: Partial<NutritionalInformation>
  ): Promise<NutritionalInformation> {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a nutritional information entry' })
  @ApiParam({ name: 'id', type: String, description: 'Nutritional Information ID' })
  @ApiResponse({ status: 204, description: 'Nutritional information deleted' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
