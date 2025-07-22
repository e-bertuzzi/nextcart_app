import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity, Consumer, PhysicalActivity } from '@nextcart/models';
import { CreatePhysicalActivityDto } from '@nextcart/dto';

@Injectable()
export class PhysicalActivityService {
  constructor(
    @InjectRepository(PhysicalActivity)
    private physicalActivityRepo: Repository<PhysicalActivity>,
    @InjectRepository(Activity)
    private activityRepo: Repository<Activity>,
    @InjectRepository(Consumer)
    private consumerRepo: Repository<Consumer>,
  ) {}

  findAll() {
    return this.physicalActivityRepo.find();
  }

  findOne(id: number) {
    return this.physicalActivityRepo.findOne({ where: { physicalActivityId: id } });
  }

  async create(dto: CreatePhysicalActivityDto) {
    const activity = await this.activityRepo.findOneByOrFail({ activityId: dto.activityId });
    const consumer = await this.consumerRepo.findOneByOrFail({ consumerId: dto.consumerId });

    const newActivity = this.physicalActivityRepo.create({
      specificActivity: dto.specificActivity,
      durationMinutes: dto.durationMinutes,
      date: dto.date,
      activity,
      consumer,
    });

    return this.physicalActivityRepo.save(newActivity);
  }

  findByConsumer(consumerId: number) {
  return this.physicalActivityRepo.find({
    where: {
      consumer: {
        consumerId: consumerId,
      },
    },
    relations: ['activity'], // se vuoi includere i dati dell’attività
  });
}


  async update(id: number, data: Partial<PhysicalActivity>) {
    await this.physicalActivityRepo.update(id, data);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.physicalActivityRepo.delete(id);
  }
}
