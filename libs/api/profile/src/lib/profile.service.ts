import { Injectable, NotFoundException } from '@nestjs/common';
import { ConsumerService } from '@nextcart/consumer';
import { ConsumerDTO } from '@nextcart/dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly consumerService: ConsumerService,  // inietti solo il service
  ) {}

  async getProfile(email: string) {
    const user = await this.consumerService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Utente non trovato');
    }
    return user;
  }

  async updateProfile(email: string, consumerDTO: ConsumerDTO) {
    // Trovo l'utente tramite email
    const user = await this.consumerService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Utente non trovato');
    }
    // Chiamo il metodo di update passando l'id e i dati da aggiornare
    const updatedUser = await this.consumerService.updateConsumer(user.consumerId, consumerDTO);
    return updatedUser;
  }
}
