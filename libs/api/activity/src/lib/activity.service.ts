import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from '@nextcart/models';
import { CreateActivityDto, UpdateActivityDto } from '@nextcart/dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async create(createDto: CreateActivityDto): Promise<Activity> {
    const activity = this.activityRepository.create(createDto);
    return this.activityRepository.save(activity);
  }

  async findAll(): Promise<Activity[]> {
    return this.activityRepository.find();
  }

  async findOne(id: number): Promise<Activity> {
    const activity = await this.activityRepository.findOne({ where: { activityId: id } });
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    return activity;
  }

  async update(id: number, updateDto: UpdateActivityDto): Promise<Activity> {
    const activity = await this.findOne(id);
    const updated = Object.assign(activity, updateDto);
    return this.activityRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.activityRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
  }
}
