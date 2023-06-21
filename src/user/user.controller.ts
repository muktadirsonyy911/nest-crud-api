import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('profile')
  getUserProfile(@GetUser() user: User) {
    return user;
  }

  @Patch()
  updateUserInfo(@GetUser('id') userId: number, @Body() dto: UpdateUserDto) {
    return this.userService.updateUserInfo(userId, dto);
  }
}
