import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConsumerModule } from '@nextcart/consumer';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokenModule } from '@nextcart/token';
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConsumerModule,
    TokenModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),  // <-- registra la strategia di default
    /*JwtModule.register({
      secret: process.env['JWT_SECRET'], // definito nel tuo .env
      signOptions: { expiresIn: '15m' }, // per accessToken
    }),*/
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        console.log('JWT_SECRET letto:', secret);  // <-- qui
        return {
          secret,
          signOptions: { expiresIn: '10s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],  // <-- aggiungi JwtStrategy ai provider
  exports: [AuthService, PassportModule],
})
export class AuthModule {}
