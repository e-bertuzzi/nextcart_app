import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BodyComposition, Consumer } from '@nextcart/models';
import { Repository } from 'typeorm';
import { CreateBodyCompositionDto } from '@nextcart/dto';

@Injectable()
export class BodyCompositionService {
  constructor(
    @InjectRepository(BodyComposition)
    private readonly bodyCompositionRepository: Repository<BodyComposition>,

    @InjectRepository(Consumer)
    private readonly consumerRepository: Repository<Consumer>,
  ) {}

  async getAllByConsumer(consumerId: number): Promise<BodyComposition[]> {
    return this.bodyCompositionRepository.find({
      where: { consumerId },
      order: { date: 'DESC' },
    });
  }

  async getOne(consumerId: number, date: string): Promise<BodyComposition> {
    const entry = await this.bodyCompositionRepository.findOne({
        where: {
            consumerId,
            date: new Date(date),
        },
    });


    if (!entry) {
      throw new NotFoundException('Body composition not found.');
    }

    return entry;
  }

  async createOrUpdate(consumerId: number, dto: CreateBodyCompositionDto): Promise<BodyComposition> {
    const consumer = await this.consumerRepository.findOne({ where: { consumerId: consumerId } });

    if (!consumer) {
      throw new NotFoundException('Consumer not found.');
    }

    const existing = await this.bodyCompositionRepository.findOne({
        where: { consumerId, date: new Date(dto.date) },
    });


    const composition = existing
      ? { ...existing, ...dto }
      : this.bodyCompositionRepository.create({ ...dto, consumerId, consumer });

    return this.bodyCompositionRepository.save(composition);
  }

  async remove(consumerId: number, date: string): Promise<void> {
    const result = await this.bodyCompositionRepository.delete({
        consumerId,
        date: new Date(date),
    });


    if (result.affected === 0) {
      throw new NotFoundException('Body composition not found.');
    }
  }
}
