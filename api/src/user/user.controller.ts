import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/getUser.decorator';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  //   constructor() {}

  @UseGuards(JwtGuard)
  @Get('me')
  getUser(@GetUser() user: User) {
    return user;
  }

  @Get(':id')
  getUserData(@Param('id') id: string) {
    return { id };
  }
}
