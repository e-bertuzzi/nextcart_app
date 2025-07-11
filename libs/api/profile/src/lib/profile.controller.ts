import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ConsumerDTO } from '@nextcart/dto';
import { JwtPayload } from '@nextcart/api-auth';

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: Request) {
    console.log('User in request:', req.user);
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('edit')  // endpoint: PUT /profile
  async updateProfile(@Req() req: RequestWithUser, @Body() updateDto: ConsumerDTO) {
    const email = req.user.email;  // prendi email dall’utente autenticato
    return this.profileService.updateProfile(email, updateDto);
  }
}
