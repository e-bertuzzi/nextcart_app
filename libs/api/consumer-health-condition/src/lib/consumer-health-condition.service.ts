import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  Consumer,
  ConsumerHealthCondition,
  HealthCondition,
  HealthConditionIncompatibility,
  NutrientHealthCondition,
} from '@nextcart/models';

@Injectable()
export class ConsumerHealthConditionService {
  constructor(
    @InjectRepository(ConsumerHealthCondition)
    private readonly consumerHealthConditionRepo: Repository<ConsumerHealthCondition>,

    @InjectRepository(HealthCondition)
    private readonly healthConditionRepo: Repository<HealthCondition>,

    @InjectRepository(HealthConditionIncompatibility)
    private readonly incompatibilityRepo: Repository<HealthConditionIncompatibility>,

    @InjectRepository(Consumer)
    private readonly consumerRepo: Repository<Consumer>,

    @InjectRepository(NutrientHealthCondition)
    private readonly nutrientHealthConditionRepo: Repository<NutrientHealthCondition>
  ) {}

  async getUserHealthConditions(userId: number): Promise<HealthCondition[]> {
    const consumerHealthConditions =
      await this.consumerHealthConditionRepo.find({
        where: { consumerId: userId },
        relations: ['healthCondition', 'healthCondition.category'], // carica anche categoria
      });

    // Mappe ogni ConsumerHealthCondition all’oggetto HealthCondition
    return consumerHealthConditions.map((chc) => chc.healthCondition);
  }

  /*async getUserHealthCondition(
    userId: number,
    conditionId: number
  ): Promise<HealthCondition | null> {
    return this.healthConditionRepo
      .createQueryBuilder('hc')
      .innerJoin(
        'consumer_health_conditions',
        'chc',
        'chc.HealthConditions = hc.healthConditionId'
      )
      .where('chc.Consumer = :userId', { userId })
      .andWhere('hc.healthConditionId = :conditionId', { conditionId })
      .leftJoinAndSelect('hc.category', 'category')
      .getOne();
  }*/

  async updateUserHealthConditions(
    userId: number,
    conditionIds: number[]
  ): Promise<void> {
    const consumer = await this.consumerRepo.findOne({
      where: { consumerId: userId },
    });
    if (!consumer) throw new NotFoundException('User not found');

    // Check incompatibilities
    const incompatibilities = await this.incompatibilityRepo
      .createQueryBuilder('inc')
      .where('inc.condition_id IN (:...ids)', { ids: conditionIds })
      .andWhere('inc.incompatible_with_id IN (:...ids)', { ids: conditionIds })
      .getMany();

    if (incompatibilities.length > 0) {
      throw new BadRequestException('Incompatible health conditions selected');
    }

    // Cancella tutte le righe esistenti per questo consumer nella tabella pivot
    await this.consumerHealthConditionRepo.delete({ consumerId: userId });

    // Crea le nuove righe per ogni healthCondition selezionata
    const newRelations = conditionIds.map((condId) => {
      const chc = new ConsumerHealthCondition();
      chc.consumerId = userId;
      chc.healthConditionId = condId.toString(); // attenzione al tipo, stringa se così definito nell'entity
      return chc;
    });

    await this.consumerHealthConditionRepo.save(newRelations);
  }

  async removeUserHealthCondition(
    userId: number,
    conditionId: string
  ): Promise<{ deleted: boolean }> {
    await this.consumerHealthConditionRepo.delete({
      consumerId: userId,
      healthConditionId: conditionId,
    });

    return { deleted: true };
  }

  async getNutrientConstraints(
    conditionId: string
  ): Promise<NutrientHealthCondition[]> {
    const constraints = await this.nutrientHealthConditionRepo.find({
      where: { healthConditionId: conditionId },
      relations: ['nutrient'],
    });

    if (!constraints.length) {
      throw new NotFoundException(
        `No nutrient constraints found for health condition: ${conditionId}`
      );
    }

    return constraints;
  }

  async getUserNutrientConstraints(userId: number) {
    // 1. Recupera tutte le condizioni di salute dell’utente
    const conditions = await this.consumerHealthConditionRepo.find({
      where: { consumer: { consumerId: userId } },
      relations: ['healthCondition'],
    });

    if (!conditions.length) {
      throw new NotFoundException(
        `No health conditions found for user ${userId}`
      );
    }

    // 2. Recupera i vincoli per ogni condizione
    const allConstraints = await Promise.all(
      conditions.map((c) =>
        this.getNutrientConstraints(c.healthCondition.healthConditionId)
      )
    );

    const flatConstraints = allConstraints.flat();

    // 3. Combina per nutrientId con il range più stringente
    const merged = Object.values(
      flatConstraints.reduce((acc, constraint) => {
        const key = constraint.nutrientId;

        if (!acc[key]) {
          acc[key] = { ...constraint };
        } else {
          acc[key].minQuantity = Math.max(
            acc[key].minQuantity ?? 0,
            constraint.minQuantity ?? 0
          );
          acc[key].maxQuantity = Math.min(
            acc[key].maxQuantity ?? Number.MAX_SAFE_INTEGER,
            constraint.maxQuantity ?? Number.MAX_SAFE_INTEGER
          );
        }

        return acc;
      }, {} as Record<string, NutrientHealthCondition>)
    );

    return merged;
  }
}
