import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NutritionalInformation } from '@nextcart/models';

@Injectable()
export class NutritionalInformationService {
  constructor(
    @InjectRepository(NutritionalInformation)
    private readonly repo: Repository<NutritionalInformation>,
  ) {}

  async findAll(): Promise<NutritionalInformation[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<NutritionalInformation> {
    const entity = await this.repo.findOne({ where: { nutrientId: id } });
    if (!entity) {
      throw new NotFoundException(`NutritionalInformation with id ${id} not found`);
    }
    return entity;
  }

  async create(data: Partial<NutritionalInformation>): Promise<NutritionalInformation> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async update(id: string, data: Partial<NutritionalInformation>): Promise<NutritionalInformation> {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
