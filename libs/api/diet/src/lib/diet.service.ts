import { Injectable, NotFoundException } from '@nestjs/common';
import { Diet, DietIncompatibility, Consumer } from '@nextcart/models';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DietService {
  constructor(
    @InjectRepository(Diet) private dietRepository: Repository<Diet>,
    @InjectRepository(DietIncompatibility)
    private incompatibilityRepository: Repository<DietIncompatibility>,
    @InjectRepository(Consumer) private consumerRepository: Repository<Consumer>
  ) {}

  async getAllDiets() {
    return this.dietRepository.find();
  }

  async getIncompatibilities() {
    return this.incompatibilityRepository.find({
      relations: ['diet', 'incompatibleWith'],
    });
  }

  /*async updateUserDiets(consumerId: number, dietIds: number[]) {
    const user = await this.consumerRepository.findOne({
      where: { consumerId },
      relations: ['diets'],
    });

    if (!user) throw new NotFoundException('User not found');

    const selectedDiets = await this.dietRepository.find({
      where: { dietId: In(dietIds) },
    });

    user.diets = selectedDiets || [];

    try {
      await this.consumerRepository.save(user);
    } catch (error) {
      console.error('Error saving diets for user:', error);
      throw error;
    }

    return user;
  }*/

  async getUserDiet(userId: number, dietId: number): Promise<Diet | null> {
    return this.dietRepository
      .createQueryBuilder('d')
      .innerJoin('d.consumers', 'c') // relazione da Diet → Consumer
      .where('c.consumerId = :userId', { userId })
      .andWhere('d.dietId = :dietId', { dietId })
      .getOne();
  }

  async removeUserDiet(
    userId: number,
    dietId: number
  ): Promise<{ deleted: boolean }> {
    await this.dietRepository.query(
      `DELETE FROM consumer_diets_diet
            WHERE "consumerConsumerId" = $1 AND "dietDietId" = $2`,
      [userId, dietId]
    );

    return { deleted: true };
  }

  async getUserDiets(userId: number) {
    return (
      this.dietRepository
        .createQueryBuilder('d')
        .innerJoin('consumer_diets_diet', 'link', 'link.dietDietId = d.dietId')
        .where('link.consumerConsumerId = :userId', { userId })
        .getMany()
    );
  }
}
