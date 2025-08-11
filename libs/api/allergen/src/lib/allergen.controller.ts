import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AllergenService } from './allergen.service';
import { Allergen } from '@nextcart/models';
import { CreateAllergenDto, UpdateAllergenDto } from '@nextcart/dto';

@ApiTags('product-allergens') // gruppo nel swagger
@Controller('product-allergens')
export class AllergenController {
  constructor(private readonly allergenService: AllergenService) {}

  @Get()
  @ApiOperation({ summary: 'Get all allergens' })
  @ApiResponse({
    status: 200,
    description: 'List of allergens',
    type: [Allergen],
  })
  async getAll(): Promise<Allergen[]> {
    return this.allergenService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get allergen by id' })
  @ApiParam({ name: 'id', description: 'Allergen id' })
  @ApiResponse({ status: 200, description: 'The allergen', type: Allergen })
  @ApiResponse({ status: 404, description: 'Allergen not found' })
  async getOne(@Param('id') id: string): Promise<Allergen> {
    const allergen = await this.allergenService.findOne(id);
    if (!allergen) {
      throw new NotFoundException(`Allergen with id ${id} not found`);
    }
    return allergen;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new allergen' })
  @ApiBody({ type: CreateAllergenDto })
  @ApiResponse({
    status: 201,
    description: 'The created allergen',
    type: Allergen,
  })
  async create(@Body() allergenData: CreateAllergenDto): Promise<Allergen> {
    return this.allergenService.create(allergenData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing allergen' })
  @ApiParam({ name: 'id', description: 'Allergen id to update' })
  @ApiBody({ description: 'Data to update allergen', type: UpdateAllergenDto })
  @ApiResponse({
    status: 200,
    description: 'The updated allergen',
    type: Allergen,
  })
  async update(
    @Param('id') id: string,
    @Body() allergenData: UpdateAllergenDto
  ): Promise<Allergen> {
    return this.allergenService.update(id, allergenData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an allergen by id' })
  @ApiParam({ name: 'id', description: 'Allergen id to delete' })
  @ApiResponse({ status: 204, description: 'Allergen deleted successfully' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.allergenService.remove(id);
  }
}
