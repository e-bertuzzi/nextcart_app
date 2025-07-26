import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { DietConsumerChoice } from '@nextcart/models';
import { Consumer } from '@nextcart/models';
import { Diet } from '@nextcart/models';

@Injectable()
export class DietConsumerChoiceService {
  constructor(
    @InjectRepository(DietConsumerChoice)
    private choiceRepo: Repository<DietConsumerChoice>,

    @InjectRepository(Consumer)
    private consumerRepo: Repository<Consumer>,

    @InjectRepository(Diet)
    private dietRepo: Repository<Diet>
  ) {}

  async findAll(): Promise<DietConsumerChoice[]> {
    return this.choiceRepo.find({ relations: ['consumer', 'diet'] });
  }

  async findByUser(userId: number): Promise<DietConsumerChoice[]> {
    return this.choiceRepo.find({
      where: { consumerId: userId },
      relations: ['diet'],
    });
  }

  async updateUserDiets(userId: number, dietIds: string[]): Promise<void> {
    const consumer = await this.consumerRepo.findOneBy({ consumerId: userId });
    if (!consumer) throw new NotFoundException('User not found');

    // Rimuovi tutte le associazioni esistenti
    await this.choiceRepo.delete({ consumerId: userId });

    // Inserisci le nuove
    const newChoices = dietIds.map((dietId) =>
      this.choiceRepo.create({
        consumerId: userId,
        dietId,
      })
    );
    await this.choiceRepo.save(newChoices);
  }

  async removeUserDiet(userId: number, dietId: string): Promise<void> {
    await this.choiceRepo.delete({ consumerId: userId, dietId });
  }
}
