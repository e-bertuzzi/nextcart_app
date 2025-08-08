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
import { AllergenService } from './allergen.service';
import { Allergen } from '@nextcart/models';

@Controller('product-allergens')
export class AllergenController {
  constructor(private readonly allergenService: AllergenService) {}

  @Get()
  async getAll(): Promise<Allergen[]> {
    return this.allergenService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Allergen> {
    const allergen = await this.allergenService.findOne(id);
    if (!allergen) {
      throw new NotFoundException(`Allergen with id ${id} not found`);
    }
    return allergen;
  }

  @Post()
  async create(@Body() allergenData: Partial<Allergen>): Promise<Allergen> {
    return this.allergenService.create(allergenData);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() allergenData: Partial<Allergen>
  ): Promise<Allergen> {
    return this.allergenService.update(id, allergenData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.allergenService.remove(id);
  }
}
