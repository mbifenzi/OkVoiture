import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Options,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
// import * as argon from 'argon2';
import { AuthGuard } from '@nestjs/passport';
// import { UserDto } from 'src/user/dto/user.dto';
import { GetUser } from './getUser.decorator';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private JwtService: JwtService,
  ) {}

  // @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async user(@Req() req: Request) {
    const cookie = req.cookies['jwt'];

    try {
      const data = await this.JwtService.verifyAsync(cookie, {
        secret: 'secret',
      });
      if (!data) {
        throw new Error('Invalid token');
      }
      console.log('data is : ', { data });
      const user = await this.authService.getUser(data.sub);
      return user;
    } catch (e) {
      throw new Error('Invalid token');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');
    return { message: 'success' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('test')
  @UseGuards(AuthGuard('jwt'))
  async test(@GetUser() user) {
    console.log('user is : ', { user });
    // return user;
  }
}
