import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  //   constructor() {}

  @Get('me')
  async getUser(@Req() req: Request) {
    const cookie = req.cookies['token'];
    console.log('cookie is : ', { cookie });
    return cookie;
  }

  @Get(':id')
  getUserData(@Param('id') id: string) {
    return { id };
  }
}
