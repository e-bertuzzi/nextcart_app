import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Allergen } from '@nextcart/models';

@Injectable()
export class AllergenService {
  constructor(
    @InjectRepository(Allergen)
    private readonly allergenRepository: Repository<Allergen>
  ) {}

  // Recupera tutti gli allergeni
  async findAll(): Promise<Allergen[]> {
    return this.allergenRepository.find();
  }

  // Recupera un allergene per ID (opzionale)
  async findOne(id: string): Promise<Allergen | undefined> {
    const allergen = await this.allergenRepository.findOne({
      where: { allergenId: id },
    });
    return allergen ?? undefined;
  }

  // Crea un nuovo allergene (opzionale)
  async create(allergenData: Partial<Allergen>): Promise<Allergen> {
    const allergen = this.allergenRepository.create(allergenData);
    return this.allergenRepository.save(allergen);
  }

  // Aggiorna un allergene (opzionale)
  async update(id: string, allergenData: Partial<Allergen>): Promise<Allergen> {
    await this.allergenRepository.update(id, allergenData);
    return this.findOne(id) as Promise<Allergen>;
  }

  // Elimina un allergene (opzionale)
  async remove(id: string): Promise<void> {
    await this.allergenRepository.delete(id);
  }
}
