import { Controller, Body, Get, HttpCode, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateConsumerDTO, LoginDTO } from '@nextcart/dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    console.log('Login DTO ricevuto:', loginDTO);
    const user = await this.authService.validateUser(loginDTO.email, loginDTO.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() createConsumerDto: CreateConsumerDTO) {
    // Chiama il service per creare l'utente
    const consumer = await this.authService.register(createConsumerDto);
    // Puoi restituire solo dati base senza passwordHash, o un messaggio di successo
    return { message: 'Utente creato con successo', userId: consumer.consumerId };
  }

  /*@UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: Request) {
    console.log('User in request:', req.user);
    return req.user;
  }*/

}
