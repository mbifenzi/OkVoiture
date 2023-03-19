import {
  Controller,
  Get,
  Param,
  Req,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
  //   constructor() {}
  
  @Get('me')
  getMyData(@Req() req: Request) {
    console.log({ req });
    return req.user;
  }

  @Get(':id')
  getUserData(@Param('id') id: string) {
    return { id };
  }
}
