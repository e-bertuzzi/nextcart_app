import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConsumerModule } from '@nextcart/consumer';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './auth.constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokenModule } from '@nextcart/token';

@Module({
  imports: [
    ConsumerModule,
    TokenModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),  // <-- registra la strategia di default
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' }, // 1 ora
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],  // <-- aggiungi JwtStrategy ai provider
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
