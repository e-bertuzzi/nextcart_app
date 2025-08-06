import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Consumer,
  ConsumerHealthCondition,
  HealthCondition,
  HealthConditionIncompatibility,
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
    private readonly consumerRepo: Repository<Consumer>
  ) {}

  async getUserHealthConditions(userId: number): Promise<HealthCondition[]> {
    const consumerHealthConditions =
      await this.consumerHealthConditionRepo.find({
        where: { Consumer: userId },
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
    await this.consumerHealthConditionRepo.delete({ Consumer: userId });

    // Crea le nuove righe per ogni healthCondition selezionata
    const newRelations = conditionIds.map((condId) => {
      const chc = new ConsumerHealthCondition();
      chc.Consumer = userId;
      chc.HealthConditions = condId.toString(); // attenzione al tipo, stringa se così definito nell'entity
      return chc;
    });

    await this.consumerHealthConditionRepo.save(newRelations);
  }

  async removeUserHealthCondition(
    userId: number,
    conditionId: string
  ): Promise<{ deleted: boolean }> {
    await this.consumerHealthConditionRepo.delete({
      Consumer: userId,
      HealthConditions: conditionId,
    });

    return { deleted: true };
  }
}
