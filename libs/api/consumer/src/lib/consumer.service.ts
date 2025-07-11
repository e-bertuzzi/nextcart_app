import { Injectable, NotFoundException } from '@nestjs/common';
import { Consumer } from '@nextcart/models';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { ConsumerDTO, CreateConsumerDTO } from '@nextcart/dto';

@Injectable()
export class ConsumerService {
  constructor(
    @InjectRepository(Consumer)
    private userRepository: Repository<Consumer>
  ) {}

  /**
   * Cerca un consumer per email
   * @param email string
   * @returns Consumer o null
   */
  public async findByEmail(email: string): Promise<Consumer | null> {
    const emailToCheck = email.toLowerCase();

    try {
      const consumer = await this.userRepository.findOne({
        where: { email: emailToCheck },
      });
      return consumer || null;
    } catch (error) {
      throw new NotFoundException(`Consumer with email ${email} not found`);
    }
  }

  /**
   * Verifica che la password inserita corrisponda all'hash salvato
   * @param consumer Consumer dal db
   * @param password string inserita dall'utente
   * @returns true se password valida, false altrimenti
   */
  public async validatePassword(
    consumer: Consumer,
    password: string
  ): Promise<boolean> {
    return bcrypt.compare(password, consumer.passwordHash);
  }

  async createFromDto(dto: CreateConsumerDTO): Promise<Consumer> {
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const newUser = this.userRepository.create({
      ...dto,
      passwordHash,
    });

    return this.userRepository.save(newUser);
  }

  async createConsumer(dto: ConsumerDTO): Promise<Consumer> {
    const entity = this.userRepository.create(dto);
    return this.userRepository.save(entity);
  }

  async updateConsumer(consumerId: number, updateData: ConsumerDTO): Promise<Consumer> {
    const user = await this.userRepository.findOne({ where: { consumerId } });
    if (!user) {
      throw new NotFoundException(`Consumer with id ${consumerId} not found`);
    }

    // Evita di aggiornare la password in questo metodo, gestiscila separatamente se serve
    // Object.assign(user, updateData);

    // Aggiorno solo i campi che vuoi consentire
    user.name = updateData.name ?? user.name;
    user.surname = updateData.surname ?? user.surname;
    user.dateOfBirth = updateData.dateOfBirth ?? user.dateOfBirth;
    user.placeOfBirth = updateData.placeOfBirth ?? user.placeOfBirth;
    user.gender = updateData.gender ?? user.gender;
    user.address = updateData.address ?? user.address;

    return this.userRepository.save(user);
  }
}
