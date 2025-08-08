import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Claim } from '@nextcart/models';

@Injectable()
export class ClaimService {
  constructor(
    @InjectRepository(Claim)
    private claimRepository: Repository<Claim>,
  ) {}

  async findAll(): Promise<Claim[]> {
    return this.claimRepository.find();
  }

  async findOne(id: string): Promise<Claim | null> {
    return this.claimRepository.findOneBy({ claimId: id });
  }

  // Altri metodi CRUD se ti servono (create, update, delete)...
}
