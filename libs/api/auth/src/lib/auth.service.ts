import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConsumerService } from '@nextcart/consumer';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConsumerDTO, CreateConsumerDTO } from '@nextcart/dto';
import { jwtConstants } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly jwtService: JwtService,
  ) {}

  // Verifica email e password
  async validateUser(email: string, password: string): Promise<any> {
    const consumer = await this.consumerService.findByEmail(email);

    console.log('Password ricevuta per confronto:', password);
    console.log('User trovato:', consumer);
    console.log('Password hash:', consumer?.passwordHash);

    if (!consumer) {
      return null;
    }

    // Confronta la password con l'hash salvato
    const passwordValid = await bcrypt.compare(password, consumer.passwordHash);
    if (!passwordValid) {
      return null;
    }


    // Rimuovi password da oggetto utente restituito per sicurezza
    const { passwordHash, ...result } = consumer;
    return result;
  }

  // Crea token JWT
  async login(user: any) {
    const payload = { email: user.email, sub: user.consumerId, role: user.role };

    const accessToken = this.jwtService.sign(payload, {
      //expiresIn: '10s', // access token breve
      expiresIn: jwtConstants.accessTokenExpiration,
    });

    const refreshToken = this.jwtService.sign(payload, {
      //expiresIn: '7d', // refresh token lungo
      expiresIn: jwtConstants.refreshTokenExpiration,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(createDto: CreateConsumerDTO) {
    const passwordHash = await bcrypt.hash(createDto.password, 10);

    const consumerDto: ConsumerDTO = {
      ...createDto,
      passwordHash,
    };

    delete (consumerDto as any).password; // rimuovi `password` se necessario

    return this.consumerService.createConsumer(consumerDto);
  }

  async validatePayload(payload: { email: string }): Promise<any> {
    const user = await this.consumerService.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('Utente non trovato');
    }

    const { passwordHash, ...result } = user;
    return result;
  }

}
