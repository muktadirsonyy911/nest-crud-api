import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
 
  @Get('profile')
  getUserProfile(@GetUser() user: User) {
    return user; 
  }

  @Patch()
  updateUserProfile(){}
} 
  