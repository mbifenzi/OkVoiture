import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request } from 'express';

import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('users')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async getUser(@Req() req: Request) {
    const cookie = req.cookies['token'];
    console.log('cookie is : ', { cookie });
    return cookie;
  }

  @Get(':id')
  getUserData(@Param('id') id: string) {
    const numid = parseInt(id);
    return this.prisma.user.findUnique({
      where: { id: numid },
    });
  }
}
