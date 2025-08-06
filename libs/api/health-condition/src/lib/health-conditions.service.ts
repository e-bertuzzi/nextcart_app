import {
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  HealthCondition,
  HealthConditionCategory,
  HealthConditionIncompatibility,
  Consumer,
} from '@nextcart/models';
import { FilterHealthConditionsDto } from '@nextcart/dto';

@Injectable()
export class HealthConditionsService {
  constructor(
    @InjectRepository(HealthConditionCategory)
    private categoryRepository: Repository<HealthConditionCategory>,
    @InjectRepository(HealthCondition)
    private healthConditionRepository: Repository<HealthCondition>,
    @InjectRepository(HealthConditionIncompatibility)
    private incompatibilityRepository: Repository<HealthConditionIncompatibility>,
    @InjectRepository(Consumer)
    private readonly consumerRepo: Repository<Consumer>
  ) {}

  async getAllCategories() {
    return this.categoryRepository.find();
  }

  /*async getHealthConditions() {
    return this.healthConditionRepository.find({
      relations: ['category'],
    });
  }*/

  async getIncompatibilities() {
    return this.incompatibilityRepository.find({
      relations: ['condition', 'incompatibleWith'],
    });
  }

  async filterHealthConditions(dto: FilterHealthConditionsDto) {
    const { selectedConditionIds = [], categoryCode } = dto;

    const qb = this.healthConditionRepository
      .createQueryBuilder('hc')
      .leftJoin('hc.category', 'category')
      .where('category.code = :categoryCode', { categoryCode });

    if (selectedConditionIds.length > 0) {
      qb.andWhere(
        `NOT EXISTS (
        SELECT 1 FROM health_condition_incompatibility inc
        WHERE
          (inc."condition_id" = hc."health_condition_id" AND inc."incompatible_with_id" IN (:...selectedConditionIds))
          OR
          (inc."incompatible_with_id" = hc."health_condition_id" AND inc."condition_id" IN (:...selectedConditionIds))
      )`,
        { selectedConditionIds }
      );
    }

    return qb.getMany();
  }

  /*async getUserHealthConditions(userId: number) {
    return this.healthConditionRepository
      .createQueryBuilder('hc')
      .innerJoin(
        'consumer_health_conditions_health_condition',
        'link',
        'link.healthConditionHealthConditionId = hc.healthConditionId'
      )
      .leftJoinAndSelect('hc.category', 'category') // <-- aggiungi questa riga
      .where('link.consumerConsumerId = :userId', { userId })
      .getMany();
  }*/

  /*async getUserHealthCondition(
    userId: number,
    conditionId: number
  ): Promise<HealthCondition | null> {
    return this.healthConditionRepository
      .createQueryBuilder('hc')
      .innerJoin(
        'consumer_health_conditions_health_condition',
        'link',
        'link.healthConditionHealthConditionId = hc.healthConditionId'
      )
      .leftJoinAndSelect('hc.category', 'category') // JOIN con categoria
      .where('link.consumerConsumerId = :userId', { userId })
      .andWhere('hc.healthConditionId = :conditionId', { conditionId })
      .getOne();
  }*/

  /*async removeUserHealthCondition(
    userId: number,
    conditionId: number
  ): Promise<{ deleted: boolean }> {
    await this.healthConditionRepository.query(
      `DELETE FROM consumer_health_conditions_health_condition
        WHERE "consumerConsumerId" = $1 AND "healthConditionHealthConditionId" = $2`,
      [userId, conditionId]
    );

    return { deleted: true };
  }*/

  /*async updateUserHealthConditions(
    consumerId: number,
    healthConditionIds: number[]
  ) {
    const user = await this.consumerRepo.findOne({
      where: { consumerId },
      relations: ['healthConditions'],
    });

    if (!user) throw new NotFoundException('User not found');

    // Controllo incompatibilità
    const incompatibilities = await this.incompatibilityRepository
      .createQueryBuilder('inc')
      .where('inc.conditionId IN (:...ids)', { ids: healthConditionIds })
      .andWhere('inc.incompatibleWithId IN (:...ids)', {
        ids: healthConditionIds,
      })
      .getMany();

    if (incompatibilities.length > 0) {
      throw new BadRequestException(
        'Selected health conditions include incompatible pairs'
      );
    }

    // Prendi le condizioni selezionate
    const selectedConditions = await this.healthConditionRepository.findByIds(
      healthConditionIds
    );

    user.healthConditions = selectedConditions;
    await this.consumerRepo.save(user);

    return user;
  }*/

  async getPathologies() {
    // Recupera solo le health conditions con categoryId = 5 (pathology)
    return this.healthConditionRepository.find({
      where: {
        category: {
          label: 'pathology', // o qualsiasi nome tu voglia filtrare
        },
      },
      relations: ['category'], // serve per fare il join
    });
  }
}
