import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Claim } from '@nextcart/models';
import { CreateClaimDto } from '@nextcart/dto';
import { UpdateClaimDto } from '@nextcart/dto';

@Injectable()
export class ClaimService {
  constructor(
    @InjectRepository(Claim)
    private claimRepository: Repository<Claim>,
  ) {}

  async findAll(): Promise<Claim[]> {
    return this.claimRepository.find();
  }

  async findOne(id: string): Promise<Claim> {
    const claim = await this.claimRepository.findOneBy({ claimId: id });
    if (!claim) throw new NotFoundException(`Claim with id ${id} not found`);
    return claim;
  }

  async create(dto: CreateClaimDto): Promise<Claim> {
    const claim = this.claimRepository.create(dto); // crea entity dal dto
    return this.claimRepository.save(claim);
  }

  async update(id: string, dto: UpdateClaimDto): Promise<Claim> {
    const claim = await this.findOne(id); // lancia NotFound se non esiste
    Object.assign(claim, dto); // aggiorna solo i campi del dto
    return this.claimRepository.save(claim);
  }

  async remove(id: string): Promise<void> {
    const claim = await this.findOne(id); // verifica se esiste
    await this.claimRepository.remove(claim);
  }
}
