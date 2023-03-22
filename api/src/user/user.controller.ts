import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  //   constructor() {}

  @Get('me')
  getUser(@Req() req: Request) {
    return req.user;
  }

  @Get(':id')
  getUserData(@Param('id') id: string) {
    return { id };
  }
}
