import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { TokenService } from '@nextcart/token';
import { ConsumerService } from '@nextcart/consumer';
import { jwtConstants } from '../auth.constants';
import { Request } from 'express';
import { Role } from '@nextcart/enum';

interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private consumerService: ConsumerService,
    private tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true, // per avere accesso a Request nel validate
    });
  }

  async validate(request: Request, payload: JwtPayload, done: VerifiedCallback) {
    // Cerca utente nel DB tramite email dal payload JWT
    const user = await this.consumerService.findByEmail(payload.email);
    if (!user) {
      // Se utente non trovato, fallisce l'autenticazione
      return done(null, false);
    }

    // Estrai il token JWT dalla request Authorization header
    const jwt = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (jwt) {
      // Aggiorna cache o logica token
      this.tokenService.put(jwt, user);
    }

    // Passa l'utente autenticato a Passport
    done(null, user);
  }
}
