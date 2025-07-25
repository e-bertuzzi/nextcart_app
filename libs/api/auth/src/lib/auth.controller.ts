import { Controller, Body, HttpCode, Post, Req, UnauthorizedException, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateConsumerDTO, LoginDTO } from '@nextcart/dto';
import { Request } from 'express';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService, //aggiunto per il refresh
  ) {}

  /*@Post('login') versione precedente al refresh
  async login(@Body() loginDTO: LoginDTO) {
    console.log('Login DTO ricevuto:', loginDTO);
    const user = await this.authService.validateUser(loginDTO.email, loginDTO.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }*/

  @Post('login')
  @ApiOperation({ summary: 'Login user and set refresh token in cookie' })
  @ApiBody({ type: LoginDTO })
  @ApiResponse({ status: 201, description: 'User logged in and access token returned' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Res({ passthrough: true }) res: Response, @Body() loginDTO: LoginDTO) {
    const user = await this.authService.validateUser(loginDTO.email, loginDTO.password);
    if (!user) throw new UnauthorizedException();

    const { accessToken, refreshToken } = await this.authService.login(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production', // in dev puoi provare false
      sameSite: 'lax', // o 'strict' ma per testing puoi provare 'lax'
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/', // assicurati sia corretto
    });

    return { accessToken };
  }

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: CreateConsumerDTO })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  async register(@Body() createConsumerDto: CreateConsumerDTO) {
    // Chiama il service per creare l'utente
    const consumer = await this.authService.register(createConsumerDto);
    // Puoi restituire solo dati base senza passwordHash, o un messaggio di successo
    return { message: 'Utente creato con successo', userId: consumer.consumerId };
  }

  //aggiunto per il refresh
  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Refresh access token using cookie-stored refresh token' })
  @ApiResponse({ status: 200, description: 'New access token returned' })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    console.log(`[${new Date().toLocaleTimeString()}] Endpoint /auth/refresh chiamato`);
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException('Error during login');
    }

    try {
      const payload = this.jwtService.verify(refreshToken); // Verifica il token
      const user = await this.authService.validatePayload({ email: payload.email });

      const newAccessToken = this.jwtService.sign(
        { email: user.email, sub: user.consumerId },
        //{ expiresIn: '10s' }, //TODO: METTERE I TEMPI NELL'ENV E SISTEMARE ANCHE CONSTANTS E JWT_SECRET
        { expiresIn:  jwtConstants.accessTokenExpiration },
      );

      return { accessToken: newAccessToken };
    } catch (e) {
      throw new UnauthorizedException('Token non valido o scaduto');
    }
  }

  /*@UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: Request) {
    console.log('User in request:', req.user);
    return req.user;
  }*/

  @Post('logout')
  @HttpCode(200)
  @ApiOperation({ summary: 'Logout user and clear refresh token cookie' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  async logout(@Res({ passthrough: true }) res: Response) {
    // Se salvi i token nel DB, puoi aggiungere logica per invalidarlo qui
    // es: await this.authService.revokeRefreshToken(userId)

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env['NODE_ENV'] === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return { message: 'Logout effettuato con successo' };
  }


    

}
